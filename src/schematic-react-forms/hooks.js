import { useCallback, useReducer, useState } from "react";

import { ValidationAction } from "./constants";

export function useFormData(fieldsetSchemata) {
    const [formData, setFormData] = useState(fieldsetSchemata.initialValues);

    function handleOnFormChange(index) {
        return (fieldsetData) => {
            setFormData((prevFormData) => {
                const fieldsetName = fieldsetSchemata[index].name;
                if (prevFormData[fieldsetName] !== fieldsetData) {
                    const newFormData = { ...prevFormData };
                    newFormData[fieldsetName] = fieldsetData;
                    return newFormData;
                }
                return prevFormData;
            });
        };
    }

    return { formData, handleOnFormChange };
}

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

export function useValidation(validator) {
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