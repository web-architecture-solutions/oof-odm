import { useRef } from "react";

import Fieldset from "../Fieldset/Fieldset";
import Button   from "../Button/Button";

export default function Form({ 
    onSubmit,
    className          = "",
    fieldsetClassName  = "",
    fieldClassName     = "",
    buttonClassName    = "",
    errors: formErrors = [],
    fieldsets          = null,
    buttonLabel        = "Submit",
    onChange           = null
}) {
    const isFormError = formErrors.length > 0;

    const formDataRef = useRef(new Array(fieldsets.length).fill({}));

    function onFieldsetChange(index) {
        return (fieldsetData) => {
            formDataRef.current[index] = fieldsetData; 
            if (onChange) onChange(formDataRef.current);
        };
    }

    return (
        <form className={className}>
            {fieldsets ? fieldsets.map((fieldset, index) =>
                <Fieldset 
                    className        = {fieldsetClassName}
                    onFieldsetChange = {onFieldsetChange(index)}
                    fieldClassName   = {fieldClassName}
                    key              = {index}
                    {...fieldset}  
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
                <span key={index}>{message}</span>
            ) : null}
        </form>
    );
}