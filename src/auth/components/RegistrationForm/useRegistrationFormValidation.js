import { useCallback } from "react";

import useFormValidation from "../../../form-components/Form/useFormValidation";

import { RegistrationError } from "../../errors";

import { RegistrationErrorCode } from "../../constants";

export default function useRegistrationFormValidation({ 
    password, 
    confirmPassword 
}) {
    const { formErrors, registerFormErrors } = useFormValidation();    

    const validatePassword = useCallback(() => {
        const  arePasswordsFalsy = !password && !confirmPassword;
        const _doPasswordsMatch  =  password === confirmPassword;
        const  doPasswordsMatch  = _doPasswordsMatch || arePasswordsFalsy;
        const  isPasswordSilly   
            =  password === "silly" || confirmPassword === "silly";

        const validationSchema = [{
            condition: !doPasswordsMatch,
            error    : RegistrationError,
            code     : RegistrationErrorCode.passwordsDoNotMatch,
            message  : "Passwords do not match"
        }, {
            condition: isPasswordSilly,
            error    : RegistrationError,
            code     : RegistrationErrorCode.passwordIsSilly,
            message  : "Password is too silly"
        }];

        registerFormErrors(validationSchema);
    }, [password, confirmPassword, registerFormErrors]);

    return { formErrors, validatePassword };
}
