import { useCallback, useReducer } from "react";
import { PasswordError } from "../../errors";

// Initialize the errors up front
const initialErrors = {
    "auth/passwords-do-not-match": null,
    "auth/password-is-silly"     : null
};

function errorReducer(formErrors, action) {
    switch (action.type) {
        case "SET_ERROR":
            return {
                ...formErrors,
                [action.payload.code]: action.payload
            };
        case "CLEAR_ERROR":
            return {
                ...formErrors,
                [action.payload.code]: null
            };
        default:
            return formErrors;
    }
}

const passwordsDoNotMatchError = new PasswordError({
    code   : "auth/passwords-do-not-match",
    message: "Passwords do not match",
});

const passwordIsSillyError = new PasswordError({
    code   : "auth/password-is-silly",
    message: "You're a silly goose",
});

export default function useRegistrationFormValidation({ 
    password, 
    confirmPassword 
}) {
    const [formErrors, dispatchError] = useReducer(errorReducer, initialErrors);

    const validatePassword = useCallback(() => {
        const doPasswordsMatch = password === confirmPassword;
        const passwordIsSilly  = password === "silly";

        dispatchError({
            type: doPasswordsMatch ? "CLEAR_ERROR" : "SET_ERROR",
            payload: passwordsDoNotMatchError
        });

        dispatchError({
            type: passwordIsSilly ? "SET_ERROR" : "CLEAR_ERROR",
            payload: passwordIsSillyError
        });
    }, [password, confirmPassword]);

    console.log(formErrors)

    return {
        formErrors: Object.values(formErrors).filter(Boolean),
        validatePassword
    };
}
