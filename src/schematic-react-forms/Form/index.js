import { useState } from "react";

import Fieldset from "../Fieldset";
import Button   from "../Button";

import { AND } from "../../logic";

import FormContext from "./context";

export default function Form({ 
    isError,
    errors,
    onSubmit,
    className         = "",
    fieldsetClassName = "",
    fieldClassName    = "",
    buttonClassName   = "",
    buttonLabel       = "Submit",
    onChange          = null,
    fieldsetSchemata  = null,
    setFieldErrors: setFieldsetErrors,
    setServerErrors
}) {
    const initialEditState = fieldsetSchemata.initialEditState;
    
    const [hasUserEdited, setHasUserEdited] = useState(initialEditState);

    const hasUserEditedAllFields = AND(...Object.values(hasUserEdited));
    
    const disabled = !hasUserEditedAllFields || isError;

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

    const formContext = { setHasUserEditedForm: setHasUserEdited };

    return (
        <FormContext.Provider value={formContext}>
            <form className={className}>
                {fieldsetSchemata ? fieldsetSchemata.map((fieldsetSchema, index) =>
                    <Fieldset 
                        className            = {fieldsetClassName}
                        onChange             = {onChange ? onChange(index) : null}
                        fieldClassName       = {fieldClassName}
                        key                  = {index}
                        updateFormErrors     = {updateFormErrors}
                        setServerErrors      = {setServerErrors}
                        {...fieldsetSchema}  
                    />
                ) : null}

                {onSubmit ? (
                    <Button 
                        onClick   = {onSubmit}
                        disabled  = {disabled}
                        className = {buttonClassName}
                    >
                        {buttonLabel}
                    </Button>
                ) : null}
                
                {isError ? errors.map(({ message }, index) => 
                    <span key={index}>{message}</span>
                ) : null}
            </form>
        </FormContext.Provider>
    );
}