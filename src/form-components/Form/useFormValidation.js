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
    const registerFormErrors = useCallback((validationSchema) => {
        validationSchema.forEach(({ condition, error, code, message }) => {
            condition ? dispatchFormError({
                type  : "SET_ERROR",
                payload: new error({ code, message })
            }) : dispatchFormError({
                type  : "CLEAR_ERROR",
                payload: code
            });
        });
    }, []);
    return { formErrors, registerFormErrors };
}