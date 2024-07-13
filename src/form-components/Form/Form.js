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
    buttonLabel        = "Submit"
}) {
    const { key, incrementKey } = useKey();

    const isFormError = formErrors.length > 0;

    //console.log(fieldsets[0].fields.map(({ ref }) => ref.current?.value))

    return (
        <form className={className} key={key}>
            {fieldsets ? fieldsets.map((fieldset, index) =>
                <Fieldset 
                    className        = {fieldsetClassName}
                    fieldClassName   = {fieldClassName}
                    key              = {index}
                    incrementFormKey = {incrementKey}
                    onChange={(fieldset) => console.log(fieldset)}
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