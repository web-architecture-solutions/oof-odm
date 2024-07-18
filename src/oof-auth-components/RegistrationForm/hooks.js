import { useCallback } from "react";

import { useValidation } from "../../schematic-hook-form/hooks";

import { RegistrationError } from "../errors";

export function useRegistrationFormValidation({ 
    password, 
    confirmPassword 
}) {
    const arePasswordsFalsy = !password && !confirmPassword;
    const doPasswordsMatch  = password === confirmPassword || arePasswordsFalsy;
    const isPasswordSilly   
        = password === "silly" || confirmPassword === "silly";

    const _validatePassword = useCallback(() => {
        return [{
            condition: !doPasswordsMatch,
            error    : RegistrationError,
            code     : "auth/passwords-do-not-match",
            message  : "Passwords do not match"
        }, {
            condition: isPasswordSilly,
            error    : RegistrationError,
            code     : "auth/password-is-silly",
            message  : "Password is too silly"
        }];
    }, [doPasswordsMatch, isPasswordSilly]);

    const [passwordErrors, validatePassword] = useValidation(_validatePassword);

    return { formErrors: [...passwordErrors], validatePassword };
}
