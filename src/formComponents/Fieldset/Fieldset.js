import Field from "../Field/Field";

const conditionalFieldsetErrorMessage 
    = "Conditional Fieldsets must be given both a 'condition' and a 'fieldMap'";

export default function Fieldset({ 
    legend,
    fields: schema, 
    fieldMap  = null, 
    condition = null 
}) {
    if (condition && fieldMap) {
        schema = fieldMap[condition];
    } else if (condition || fieldMap) {
        throw new Error(conditionalFieldsetErrorMessage);
    }
    return (
        <fieldset>
            <legend>{legend}</legend>
            {schema.map((fieldSchema) =>
                <Field {...fieldSchema} key={fieldSchema.name} />        
            )}
        </fieldset>
    );
}