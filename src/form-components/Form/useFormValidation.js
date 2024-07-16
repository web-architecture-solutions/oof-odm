import { useCallback, useReducer } from "react";

function errorReducer(formErrors, { type, payload }) {
    switch (type) {
        case "SET_ERROR":
            return formErrors.some(({ code }) => code === payload.code)
                ? formErrors
                : [...formErrors, payload];
        case "CLEAR_ERROR":
            return formErrors.filter(({ code }) => code !== payload);
        default:
            return formErrors;
    }
}

export default function useFormValidation() {
    const [formErrors, dispatchFormError] = useReducer(errorReducer, []);
    
    const setFormError = useCallback((payload) => {
        dispatchFormError({
            type  : "SET_ERROR",
            payload: payload
        }); 
    }, []);

    const clearFormError = useCallback((payload) => {
        dispatchFormError({
            type  : "CLEAR_ERROR",
            payload: payload
        }); 
    }, []);

    return { formErrors, setFormError, clearFormError };
}