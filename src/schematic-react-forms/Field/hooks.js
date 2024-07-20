import { useCallback, useEffect } from "react";

import { FieldError } from "../errors";

import { useValidation } from "../hooks";

import { FieldType } from "../constants";

import { AND } from "../../logic";

export function useFieldValidation({ isRequired, value, type, hasUserEdited }) {
    const _validateField = useCallback(() => {
        const isEmailAddressField = type === FieldType.email;
        const isValidEmailAddress = value?.match(/^\S+@\S+\.\S+$/);
        
        const isRequiredError = AND(
            hasUserEdited, 
            isRequired, 
            !value
        );
        
        const isInvalidEmailError = AND(
            hasUserEdited, 
            !isRequiredError, 
            isEmailAddressField, 
            !isValidEmailAddress
        );
        
        return [{
            condition: isRequiredError,
            error    : FieldError,
            code     : "schematic-react-forms/field-is-required",
            message  : "Field is required",
        }, {
            condition: isInvalidEmailError,
            error    : FieldError,
            code     : "schematic-react-forms/field-is-not-valid-email",
            message  : "Please enter a valid email address"
        }];
    }, [isRequired, value, type]);

    const [fieldErrors, validateField] = useValidation(_validateField);

    useEffect(() => validateField(), [validateField]);

    return fieldErrors;
}