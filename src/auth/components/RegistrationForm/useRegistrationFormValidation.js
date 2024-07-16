import { useCallback, useReducer } from "react";

import { PasswordError } from "../../errors";

function errorReducer(formErrors, { type, _error }) {
    switch (type) {
        case "SET_ERROR":
            return formErrors.some(({ code }) => code === _error.code)
                ? formErrors
                : [...formErrors, new PasswordError(_error)];
        case "CLEAR_ERROR":
            return formErrors.filter(({ code }) => code !== _error.code);
        default:
            return formErrors;
    }
}

export default function useRegistrationFormValidation({ 
    password, 
    confirmPassword 
}) {
    const [formErrors, dispatchError] = useReducer(errorReducer, []);

    const validatePassword = useCallback(() => {
        const  arePasswordsFalsy = !password && !confirmPassword;
        const _doPasswordsMatch  =  password === confirmPassword;
        const  doPasswordsMatch  = _doPasswordsMatch || arePasswordsFalsy;
        const  isPasswordSilly   
            =  password === "silly" || confirmPassword === "silly";

        dispatchError({
            type  : !doPasswordsMatch ? "SET_ERROR" : "CLEAR_ERROR",
            _error: {
                code   : "auth/passwords-do-not-match",
                message: "Passwords do not match"
            }
        });
        
        dispatchError({
            type  : isPasswordSilly ? "SET_ERROR" : "CLEAR_ERROR",
            _error: {
                code   : "auth/passwords-is-silly",
                message: "Password is too silly"
            }
        });
    }, [password, confirmPassword]);

    return { formErrors, validatePassword };
}
