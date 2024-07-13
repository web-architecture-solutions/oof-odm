import { useState } from "react";

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
    buttonLabel        = "Submit"
}) {
    const isFormError = formErrors.length > 0;

    const [key, setKey] = useState(0);

    const defaultOnChange = () => setKey(({ key }) => ({ key: key + 1 }));

    return (
        <form className={className} key={key}>
            {fieldsets ? fieldsets.map((fieldset, index) =>
                <Fieldset 
                    className       = {fieldsetClassName}
                    fieldClassName  = {fieldClassName}
                    key             = {index}
                    defaultOnChange = {defaultOnChange}
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