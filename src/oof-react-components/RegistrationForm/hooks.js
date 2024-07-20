import { useCallback, useState } from "react";

import { useValidation } from "../../schematic-react-forms/hooks";

import { RegistrationError } from "../errors";

export function useRegistrationFormValidation({ 
    password, 
    confirmPassword 
}) {
    const [serverErrors, setServerErrors] = useState([]);

    const arePasswordsFalsy = !password && !confirmPassword;
    const doPasswordsMatch  = password === confirmPassword;
    
    const isPasswordMatchError = !arePasswordsFalsy && !doPasswordsMatch;

    const _validatePassword = useCallback(() => {
        return [{
            condition: isPasswordMatchError,
            error    : RegistrationError,
            code     : "oof-react-components/passwords-do-not-match",
            message  : "Passwords do not match"
        }];
    }, [isPasswordMatchError]);

    const [passwordErrors, validatePassword] = useValidation(_validatePassword);

    return { 
        formErrors: [...passwordErrors, ...serverErrors], 
        validatePassword, 
        setServerErrors 
    };
}
