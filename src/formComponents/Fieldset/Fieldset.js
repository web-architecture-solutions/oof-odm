import Field from "../Field/Field";

const conditionalFieldsetErrorMessage 
    = "Conditional Fieldsets must be given both a 'condition' and a 'fieldMap'";

export default function Fieldset({ 
    legend,
    children, 
    fields    = null,
    fieldMap  = null, 
    condition = null 
}) {
    if (condition && fieldMap) {
        fields = fieldMap[condition];
    } else if (condition || fieldMap) {
        throw new Error(conditionalFieldsetErrorMessage);
    }
    return (
        <fieldset>
            {legend ? (
                <legend>{legend}</legend>
            ) : null}
            {fields ? fields.map((field, index) =>
                <Field {...field} key={index} />
            ) : null}
            {children}
        </fieldset>
    );
}