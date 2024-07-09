import Fieldset from "../Fieldset/Fieldset";
import Button   from "../Button/Button";

export default function Form({ 
    children, 
    schemata = null,
    buttonLabel = "Submit", 
    onSubmit 
}) {
    return (
        <form>
            {schemata ? schemata.map((props, index) =>
                <Fieldset {...props} key={index} />
            ) : null}
            {children}
            <Button onClick={onSubmit}>{buttonLabel}</Button>
        </form>
    );
}