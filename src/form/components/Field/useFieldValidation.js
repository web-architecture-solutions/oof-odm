import { useEffect, useReducer } from "react";

import { FieldError } from "../../errors";

function fieldErrorReducer(fieldErrors, error) {
    if (error === null) return fieldErrors;
    switch (error.code) {
        case "form/field-is-required":        
            const updatedErrors = fieldErrors.filter((_error) => {
                return _error.code !== error.code;
            });
            return [...updatedErrors, error];
        default:
            return fieldErrors;
    }
}

export default function useFieldValidation({ isRequired, value }) {
    const [fieldErrors, dispatchFieldError] = useReducer(fieldErrorReducer, []);

    const hasUserEdited = value !== null;

    useEffect(() => {
        const isRequiredFieldSatisfied = !isRequired || value || !hasUserEdited;
        
        const isRequiredError = !isRequiredFieldSatisfied
            ? new FieldError({
                  code   : "form/field-is-required",
                  message: "Field is required",
              })
            : null;
        
        dispatchFieldError(isRequiredError);
    }, [isRequired, value, hasUserEdited]);

    return fieldErrors;
}