import { useCallback } from "react";

import useFormValidation from "../../../form-components/Form/useFormValidation";

import { RegistrationError } from "../../errors";

export default function useRegistrationFormValidation({ 
    password, 
    confirmPassword 
}) {
    const { formErrors, dispatchFormErrors } = useFormValidation();    

    const validatePassword = useCallback(() => {
        const  arePasswordsFalsy = !password && !confirmPassword;
        const _doPasswordsMatch  =  password === confirmPassword;
        const  doPasswordsMatch  = _doPasswordsMatch || arePasswordsFalsy;
        const  isPasswordSilly   
            =  password === "silly" || confirmPassword === "silly";

        dispatchFormErrors([{
            condition: !doPasswordsMatch,
            error    : RegistrationError,
            code     : "auth/passwords-do-not-match",
            message  : "Passwords do not match"
        }, {
            condition: isPasswordSilly,
            error    : RegistrationError,
            code     : "auth/passwords-is-silly",
            message  : "Password is too silly"
        }]);
    }, [password, confirmPassword, dispatchFormErrors]);

    return { formErrors, validatePassword };
}
