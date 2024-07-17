import { useCallback, useReducer } from "react";

const FormValidationAction = {
    CLEAR_ERROR: "CLEAR_ERROR",
    SET_ERROR  : "SET_ERROR"
};

function errorReducer(formErrors, { type, payload }) {
    switch (type) {
        case FormValidationAction.SET_ERROR:
            return formErrors.some(({ code }) => code === payload.code)
                ? formErrors
                : [...formErrors, payload];
        case FormValidationAction.CLEAR_ERROR:
            return formErrors.filter(({ code }) => code !== payload);
        default:
            return formErrors;
    }
}

export default function useFormValidation(_validator, triggers) {
    const [formErrors, dispatchFormError] = useReducer(errorReducer, []);
    const dispatchFormErrors = useCallback((validationSchema) => {
        validationSchema.forEach(({ condition, error, code, message }) => {
            condition ? dispatchFormError({
                type  : FormValidationAction.SET_ERROR,
                payload: new error({ code, message })
            }) : dispatchFormError({
                type  : FormValidationAction.CLEAR_ERROR,
                payload: code
            });
        });
    }, []);
    const validator = useCallback(() => {
        dispatchFormErrors(_validator());
    }, triggers);
    return [formErrors, validator];
}
