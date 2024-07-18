import { useCallback, useReducer } from "react";

const ValidationAction = {
    CLEAR_ERROR: "CLEAR_ERROR",
    SET_ERROR: "SET_ERROR"
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

export default function useValidation(validator) {
    const [errors, dispatchError] = useReducer(errorReducer, []);
    const validate = useCallback(() => {
        const validationSchema = validator();
        validationSchema.forEach(({ condition, error, code, message }) => {
            if (condition) {
                dispatchError({
                    type: ValidationAction.SET_ERROR,
                    payload: new error({ code, message })
                });
            } else {
                dispatchError({
                    type: ValidationAction.CLEAR_ERROR,
                    payload: code
                });
            }
        });
    }, [validator]);
    return [errors, validate];
}
