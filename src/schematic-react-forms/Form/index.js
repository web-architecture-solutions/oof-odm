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
    const [_formErrors, set_formErrors] = useState({});

    const isFormError = formErrors.length > 0;

    function updateFormErrors(fieldsetErrorObject) {
        set_formErrors((prev_formErrors) => {
            const [fieldsetName, fieldsetErrors] = Object.entries(fieldsetErrorObject)[0];
            if (prev_formErrors[fieldsetName] !== fieldsetErrors) {
                return { 
                    ...prev_formErrors,
                    [fieldsetName]: fieldsetErrors
                };
            }
            return prev_formErrors;
        })
    }

    console.log(_formErrors)

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
                    disabled  = {isFormError}
                    className = {buttonClassName}
                >
                    {buttonLabel}
                </Button>
            ) : null}
            
            {isFormError ? formErrors.map(({ message }, index) => 
                <span key={index}>
                    {message}
                </span>
            ) : null}
        </form>
    );
}