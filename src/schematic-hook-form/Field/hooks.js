import { useCallback, useEffect } from "react";

import { FieldError } from "../errors";

import { useValidation } from "../hooks";

import { FieldType } from "../constants";

export function useFieldValidation({ isRequired, value, type }) {
    const _validateField = useCallback(() => {
        const hasUserEdited       = value !== null;
        const isEmailAddressField = type === FieldType.email;
        const isValidEmailAddress = value?.match(/^\S+@\S+\.\S+$/);
        
        const isRequiredError 
            = hasUserEdited && isRequired && !value;
        const isInvalidEmailError 
            = !isRequiredError && isEmailAddressField && !isValidEmailAddress;
        
        return [{
            condition: isRequiredError,
            error    : FieldError,
            code     : "form/field-is-required",
            message  : "Field is required",
        }, {
            condition: isInvalidEmailError,
            error    : FieldError,
            code     : "form/field-is-not-valid-email",
            message  : "Please enter a valid email address"
        }];
    }, [isRequired, value, type]);

    const [fieldErrors, validateField] = useValidation(_validateField);

    useEffect(() => validateField(), [value, isRequired, validateField]);

    return fieldErrors;
}