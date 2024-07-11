import Fieldset from "../Fieldset/Fieldset";
import Button   from "../Button/Button";

export default function Form({ 
    children, 
    onSubmit,
    className         = "",
    fieldsetClassName = "",
    errorMessage      = "",
    fieldsets         = null,
    buttonLabel       = "Submit"
}) {
    return (
        <form className={className}>
            {fieldsets ? fieldsets.map((fieldset, index) =>
                <Fieldset 
                    className = {fieldsetClassName}
                    key       = {index}
                    {...fieldset}  
                />
            ) : null}
            {children}
            {onSubmit ? (
                <Button 
                    onClick  = {onSubmit}
                    disabled = {errorMessage}
                >
                    {buttonLabel}
                </Button>
            ) : null}
            {errorMessage ? (
                <span>{errorMessage}</span>
            ) : null}
        </form>
    );
}