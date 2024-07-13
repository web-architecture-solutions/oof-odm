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

export default function useRegistrationFormValidation({
    passwordRef,
    confirmPasswordRef,
}) {
    const [formErrors, dispatchError] = useReducer(errorReducer, initialErrors);

    const validatePassword = useCallback(() => {
        const { value:        password } =        passwordRef.current;
        const { value: confirmPassword } = confirmPasswordRef.current;

        const doPasswordsMatch = password === confirmPassword;
        
        const passwordsDoNotMatchError = !doPasswordsMatch
            ? new PasswordError({
                code   : "auth/passwords-do-not-match",
                message: "Passwords do not match",
              })
            : null;

        dispatchError(passwordsDoNotMatchError);
    }, [passwordRef, confirmPasswordRef]);

    return {
        formErrors: Object.values(formErrors).filter(Boolean),
        validatePassword,
    };
}
