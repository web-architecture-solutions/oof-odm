import { useState } from "react";

import Fieldset from "../Fieldset";
import Button   from "../Button";

import { AND } from "../../logic";

import useFieldErrors from "./hooks";

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
    const initialEditState = fieldsetSchemata.initialEditState;
    
    const [fieldsetErrors, setFieldsetErrors] = useState({});
    const [hasUserEdited ,  setHasUserEdited] = useState(initialEditState);

    const hasUserEditedAllFields = AND(...Object.values(hasUserEdited));
    const fieldErrors            = useFieldErrors(fieldsetErrors);
    const errors                 = [...formErrors, ...fieldErrors];
    const isFormError            = formErrors.length > 0;
    const isError                = errors.length > 0;

    function updateFormErrors(fieldsetErrorObject) {
        setFieldsetErrors((prevFieldsetErrors) => {
            const fieldsetErrorRecords = Object.entries(fieldsetErrorObject);
            const [fieldsetName, fieldsetErrors] = fieldsetErrorRecords[0];
            return prevFieldsetErrors[fieldsetName] !== fieldsetErrors ? { 
                ...prevFieldsetErrors,
                [fieldsetName]: fieldsetErrors
            } : prevFieldsetErrors;
        });
    }

    return (
        <form className={className}>
            {fieldsetSchemata ? fieldsetSchemata.map((fieldsetSchema, index) =>
                <Fieldset 
                    className            = {fieldsetClassName}
                    onChange             = {onChange ? onChange(index) : null}
                    fieldClassName       = {fieldClassName}
                    key                  = {index}
                    updateFormErrors     = {updateFormErrors}
                    setHasUserEditedForm = {setHasUserEdited}
                    {...fieldsetSchema}  
                />
            ) : null}

            {onSubmit ? (
                <Button 
                    onClick   = {onSubmit}
                    disabled  = {!hasUserEditedAllFields || isError}
                    className = {buttonClassName}
                >
                    {buttonLabel}
                </Button>
            ) : null}
            
            {isFormError ? formErrors.map(({ message }, index) => 
                <span key={index}>{message}</span>
            ) : null}
        </form>
    );
}