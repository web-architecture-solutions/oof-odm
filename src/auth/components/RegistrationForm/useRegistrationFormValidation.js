import { useCallback, useReducer } from "react";

import { PasswordError } from "../../errors";

const passwordsDoNotMatch = {
    code   : "auth/passwords-do-not-match",
    message: "Passwords do not match"
};

const passwordIsSilly = {
    code   : "auth/passwords-is-silly",
    message: "Password is too silly"
};

const initialErrors = {
    [passwordsDoNotMatch.code]: null,
    [passwordIsSilly.code]    : null
};

function errorReducer(formErrors, action) {
    switch (action.type) {
        case "SET_ERROR":
            return {
                ...formErrors,
                [action.payload.code]: new PasswordError(action.payload)
            };
        case "CLEAR_ERROR":
            const clearedErrorEntries = Object.entries(formErrors).filter(([code]) => {
                return code !== action.payload.code;
            })
            return Object.fromEntries(clearedErrorEntries);
        default:
            return formErrors;
    }
}

export default function useRegistrationFormValidation({ 
    password, 
    confirmPassword 
}) {
    const [formErrors, dispatchError] = useReducer(errorReducer, initialErrors);

    const validatePassword = useCallback(() => {
        const doPasswordsMatch = password === confirmPassword;
        const isPasswordSilly  = password === "silly";

        dispatchError({
            type   : !doPasswordsMatch ? "SET_ERROR" : "CLEAR_ERROR",
            payload: passwordsDoNotMatch
        });
        
        dispatchError({
            type   : isPasswordSilly ? "SET_ERROR" : "CLEAR_ERROR",
            payload: passwordIsSilly
        });
    }, [password, confirmPassword]);

    return {
        formErrors: Object.values(formErrors),
        validatePassword
    };
}
