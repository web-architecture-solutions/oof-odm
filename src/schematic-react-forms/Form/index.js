import { useState } from "react";

import Fieldset from "../Fieldset";
import Button   from "../Button"

export default function Form({ 
    onSubmit,
    className          = "",
    fieldsetClassName  = "",
    fieldClassName     = "",
    buttonClassName    = "",
    buttonLabel        = "Submit",
    onChange           = null,
    errors: formErrors = [],
    fieldsetSchemata   = null,
}) {
    const [fieldsetErrors, setFieldsetErrors] = useState({});

    const fieldErrors = Object
        .values(fieldsetErrors)
        .reduce((accumulatedFieldsetErrors, currentFieldsetErrors) => {
            const flattendFieldsetErrors 
                = Object.values(currentFieldsetErrors).flat();
            return [...accumulatedFieldsetErrors, ...flattendFieldsetErrors];
        }, []);

    const errors = [...formErrors, ...fieldErrors];

    const isError = errors.length > 0;

    function updateFormErrors(fieldsetErrorObject) {
        setFieldsetErrors((prevFieldsetErrors) => {
            const [fieldsetName, fieldsetErrors] 
                = Object.entries(fieldsetErrorObject)[0];
            if (prevFieldsetErrors[fieldsetName] !== fieldsetErrors) {
                return { 
                    ...prevFieldsetErrors,
                    [fieldsetName]: fieldsetErrors
                };
            }
            return prevFieldsetErrors;
        });
    }

    return (
        <form className={className}>
            {fieldsetSchemata ? fieldsetSchemata.map((fieldsetSchema, index) =>
                <Fieldset 
                    className        = {fieldsetClassName}
                    onChange         = {onChange ? onChange(index) : null}
                    fieldClassName   = {fieldClassName}
                    key              = {index}
                    updateFormErrors = {updateFormErrors}
                    {...fieldsetSchema}  
                />
            ) : null}

            {onSubmit ? (
                <Button 
                    onClick   = {onSubmit}
                    disabled  = {isError}
                    className = {buttonClassName}
                >
                    {buttonLabel}
                </Button>
            ) : null}
            
            {isError ? formErrors.map(({ message }, index) => 
                <span key={index}>
                    {message}
                </span>
            ) : null}
        </form>
    );
}