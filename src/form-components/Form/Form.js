import Fieldset from "../Fieldset/Fieldset";
import Button   from "../Button/Button";

import { useKey } from "../hooks";

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

    const isFormError = formErrors.length > 0;

    if (onChange) {
        const formData = fieldsets.map(({ fields }) => {
            const fieldRecords = fields.flatMap(({ name, ref }) => {
                return Object.entries({ [name]: ref.current?.value });
            });
        
            const fieldsetData = Object.fromEntries(fieldRecords);
            return fieldsetData;
        });

        onChange(formData);
    }

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