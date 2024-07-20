import { useState } from "react";

import Fieldset from "../Fieldset";
import Button   from "../Button";

import { AND } from "../../logic";

export default function Form({ 
    onSubmit,
    className          = "",
    fieldsetClassName  = "",
    fieldClassName     = "",
    buttonClassName    = "",
    serverError        = null,
    buttonLabel        = "Submit",
    onChange           = null,
    errors: formErrors = [],
    fieldsetSchemata   = null,
}) {
    const initialhasUserEdited = Object.fromEntries(fieldsetSchemata.reduce((accumulatedFieldsets, currentFieldset) => {
        return [            
            ...accumulatedFieldsets,
            ...currentFieldset.fields.reduce((accumulatedFields, { name }) => {
                return [ ...accumulatedFields, [name, false] ];
            }, [])
        ]
    }, []));

    const [fieldsetErrors, setFieldsetErrors] = useState({});
    const [hasUserEditedForm, setHasUserEditedForm] = useState(initialhasUserEdited);

    const hasUserEditedAllFields = AND(...Object.values(hasUserEditedForm));

    const fieldErrors = Object
        .values(fieldsetErrors)
        .reduce((accumulatedFieldsetErrors, currentFieldsetErrors) => {
            const flattendFieldsetErrors 
                = Object.values(currentFieldsetErrors).flat();
            return [...accumulatedFieldsetErrors, ...flattendFieldsetErrors];
        }, []);

    const errors = [...formErrors, ...fieldErrors];

    const isFormError = formErrors.length > 0;

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
                    className            = {fieldsetClassName}
                    onChange             = {onChange ? onChange(index) : null}
                    fieldClassName       = {fieldClassName}
                    key                  = {index}
                    updateFormErrors     = {updateFormErrors}
                    setHasUserEditedForm = {setHasUserEditedForm}
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
                <span key={index}>
                    {message}
                </span>
            ) : serverError ? (
                <span>{serverError.message}</span>
            ) : null}
        </form>
    );
}