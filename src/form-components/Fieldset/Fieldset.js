import Field from "../Field/Field";

import { useKey } from "../hooks";

const conditionalFieldsetErrorMessage 
    = "Conditional Fieldsets must be given both a 'condition' and a 'fieldMap'";

export default function Fieldset({ 
    legend,
    className      = "",
    fieldClassName = "",
    fields         = null,
    fieldMap       = null,
    condition      = null,
    incrementFormKey
}) {
    if (condition && fieldMap) {
        fields = fieldMap[condition];
    } else if (condition || fieldMap) {
        throw new Error(conditionalFieldsetErrorMessage);
    }

    const { key, incrementKey } = useKey();

    console.log(fields);

    return (
        <fieldset className={className} key={key}>
            {legend ? (
                <legend>{legend}</legend>
            ) : null}

            {fields ? fields.map((field, index) =>
                <Field 
                    className            = {fieldClassName}
                    key                  = {index}
                    incrementFormKey     = {incrementFormKey}
                    incrementFieldsetKey = {incrementKey}
                    {...field}
                />
            ) : null}
        </fieldset>
    );
}