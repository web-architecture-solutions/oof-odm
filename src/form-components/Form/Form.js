import Fieldset from "../Fieldset/Fieldset";
import Button   from "../Button/Button";

import { useKey } from "../hooks";

import { aggregateFieldsets } from "../util";
import { useEffect } from "react";

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
    const { key, incrementKey } = useKey();

    useEffect(() => {
        if (onChange) {
            const formData = aggregateFieldsets(fieldsets);
            onChange(formData);
        }
    }, [onChange, fieldsets]);
    
    const isFormError = formErrors.length > 0;

    return (
        <form className={className} key={key}>
            {fieldsets ? fieldsets.map((fieldset, index) =>
                <Fieldset 
                    className        = {fieldsetClassName}
                    fieldClassName   = {fieldClassName}
                    key              = {index}
                    incrementFormKey = {incrementKey}
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