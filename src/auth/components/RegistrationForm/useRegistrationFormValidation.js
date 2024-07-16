import { useCallback } from "react";

import useFormValidation from "../../../form-components/Form/useFormValidation";

import { RegistrationError } from "../../errors";

import { RegistrationErrorCode } from "../../constants";

export default function useRegistrationFormValidation({ 
    password, 
    confirmPassword 
}) {
    const { formErrors, setFormError, clearFormError } = useFormValidation();    

    const validatePassword = useCallback(() => {
        const  arePasswordsFalsy = !password && !confirmPassword;
        const _doPasswordsMatch  =  password === confirmPassword;
        const  doPasswordsMatch  = _doPasswordsMatch || arePasswordsFalsy;
        const  isPasswordSilly   
            =  password === "silly" || confirmPassword === "silly";

        !doPasswordsMatch ? setFormError(
            new RegistrationError({
                code   : RegistrationErrorCode.passwordsDoNotMatch,
                message: "Passwords do not match",
            })
        ) : clearFormError(RegistrationErrorCode.passwordsDoNotMatch);
        
        isPasswordSilly ? setFormError(
            new RegistrationError({
                code   : RegistrationErrorCode.passwordIsSilly,
                message: "Password is too silly"
            })
        ) : clearFormError(RegistrationErrorCode.passwordIsSilly);
        
    }, [password, confirmPassword, setFormError, clearFormError]);

    return { formErrors, validatePassword };
}
