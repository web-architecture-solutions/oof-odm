import { useCallback, useReducer } from "react";

import { PasswordError } from "../../errors";

const initialErrors = { "auth/passwords-do-not-match": null };

function errorReducer(formErrors, error) {
    return error === null ? { 
        ...formErrors, 
        "auth/passwords-do-not-match": null  
    } : { 
        ...formErrors, 
        [error.code] : error 
    };
}

export default function useRegistrationFormValidation({ formData }) {
    const [formErrors, dispatchError] = useReducer(errorReducer, initialErrors);
    
    const { 
        password, 
        confirmPassword 
    } = formData[0].fields ?? { 
        password       : null,
        confirmPassword: null
    };

    const validatePassword = useCallback(() => {
        if (formData[0].fields) {
            const doPasswordsMatch = password === confirmPassword;
        
            const passwordsDoNotMatchError = !doPasswordsMatch
                ? new PasswordError({
                    code   : "auth/passwords-do-not-match",
                    message: "Passwords do not match",
                })
                : null;
        
            dispatchError(passwordsDoNotMatchError);
        }
    }, [password, confirmPassword]);
    
    return {
        formErrors: Object.values(formErrors).filter(Boolean),
        validatePassword
    };
}
