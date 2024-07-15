import Fieldset from "../Fieldset/Fieldset";
import Button   from "../Button/Button";

export default function Form({ 
    onSubmit,
    className                = "",
    fieldsetClassName        = "",
    fieldClassName           = "",
    buttonClassName          = "",
    buttonLabel              = "Submit",
    onChange                 = null,
    errors: formErrors       = [],
    schema: fieldsetSchemata = null,
}) {
    const isFormError = formErrors.length > 0;

    return (
        <form className={className}>
            {fieldsetSchemata ? fieldsetSchemata.map((fieldsetSchema, index) =>
                <Fieldset 
                    className      = {fieldsetClassName}
                    onChange       = {onChange ? onChange(index) : null}
                    fieldClassName = {fieldClassName}
                    key            = {index}
                    {...fieldsetSchema}  
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
                <span key={index}>
                    {message}
                </span>
            ) : null}
        </form>
    );
}