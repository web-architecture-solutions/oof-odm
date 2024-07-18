import { useCallback, useEffect } from "react";

import { FieldError } from "../errors";

import { useValidation } from "../hooks";

export function useFieldValidation({ isRequired, value }) {
    const _validateField = useCallback(() => {
        const hasUserEdited   = value !== null;
        const valueIsTooSilly = value === "silly";
        
        return [{
            condition: isRequired && !value & hasUserEdited,
            error    : FieldError,
            code     : "form/field-is-required",
            message  : "Field is required",
        }, {
            condition: valueIsTooSilly,
            error    : FieldError,
            code     : "form/value-is-too-silly",
            message  : "You're a silly goose"
        }];
    }, [isRequired, value]);

    const [fieldErrors, validateField] = useValidation(_validateField);

    useEffect(() => validateField(), [value, isRequired, validateField])

    return fieldErrors;
}