import { useCallback, useReducer } from "react";

const ValidationAction = {
    CLEAR_ERROR: "CLEAR_ERROR",
    SET_ERROR  : "SET_ERROR"
};

function errorReducer(errors, { type, payload }) {
    switch (type) {
        case ValidationAction.SET_ERROR:
            return errors.some(({ code }) => code === payload.code)
                ? errors
                : [...errors, payload];
        case ValidationAction.CLEAR_ERROR:
            return errors.filter(({ code }) => code !== payload);
        default:
            return errors;
    }
}

export default function useValidation(validationSchema, triggers) {
    const [errors, dispatchError] = useReducer(errorReducer, []);
    const validator = useCallback(() => {
        validationSchema.forEach(({ condition, error, code, message }) => {
            condition ? dispatchError({
                type   : ValidationAction.SET_ERROR,
                payload: new error({ code, message })
            }) : dispatchError({
                type   : ValidationAction.CLEAR_ERROR,
                payload: code
            });
        });
    }, triggers);
    return [errors, validator];
}