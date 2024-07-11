import Fieldset from "../Fieldset/Fieldset";
import Button   from "../Button/Button";

export default function Form({ 
    children, 
    onSubmit,
    className         = "",
    fieldsetClassName = "",
    errors            = [],
    fieldsets         = null,
    buttonLabel       = "Submit"
}) {
    const isError = errors.length > 0;
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
                    disabled = {isError}
                >
                    {buttonLabel}
                </Button>
            ) : null}
            
            {isError ? errors.map((error, index) => 
                <span key={index}>{error}</span>
            ) : null}
        </form>
    );
}