import Fieldset from "../Fieldset/Fieldset";
import Button   from "../Button/Button";

export default function Form({ 
    onSubmit,
    className          = "",
    fieldsetClassName  = "",
    errors: formErrors = [],
    fieldsets          = null,
    buttonLabel        = "Submit"
}) {
    const isFormError = formErrors.length > 0;

    return (
        <form className={className}>
            {fieldsets ? fieldsets.map((fieldset, index) =>
                <Fieldset 
                    className = {fieldsetClassName}
                    key       = {index}
                    {...fieldset}  
                />
            ) : null}

            {onSubmit ? (
                <Button 
                    onClick  = {onSubmit}
                    disabled = {isFormError}
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