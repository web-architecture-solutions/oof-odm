import Field from "../Field/Field";

const conditionalFieldsetErrorMessage 
    = "Conditional Fieldsets must be given both a 'condition' and a 'fieldMap'";

export default function Fieldset({ 
    legend,
    schemata = null,
    children, 
    fieldMap  = null, 
    condition = null 
}) {
    if (condition && fieldMap) {
        children = fieldMap[condition];
    } else if (condition || fieldMap) {
        throw new Error(conditionalFieldsetErrorMessage);
    }
    return (
        <fieldset>
            <legend>{legend}</legend>
            {schemata ? schemata.map((props, index) =>
                <Field {...props} key={index} />
            ) : null}
            {children}
        </fieldset>
    );
}