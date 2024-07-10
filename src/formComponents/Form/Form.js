import Fieldset from "../Fieldset/Fieldset";
import Button   from "../Button/Button";

export default function Form({ 
    children, 
    onSubmit,
    errorMessages,
    fieldsets   = null,
    buttonLabel = "Submit"
}) {
    return (
        <form>
            {fieldsets ? fieldsets.map((fieldset, index) =>
                <Fieldset {...fieldset} key={index} />
            ) : null}
            {children}
            {onSubmit ? (
                <Button onClick={onSubmit}>{buttonLabel}</Button>
            ) : null}
        </form>
    );
}