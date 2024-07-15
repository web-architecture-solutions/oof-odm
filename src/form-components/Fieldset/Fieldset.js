import { useRef } from "react";

import Field from "../Field/Field";

export default function Fieldset({ 
    legend,
    className      = "",
    fieldClassName = "",
    fields         = null,
    fieldMap       = null,
    condition      = null,
    onFieldsetChange
}) {
    if (condition && fieldMap && fieldMap[condition]) {
        fields = fieldMap[condition];
    } else if (condition && fieldMap) {
        throw new Error(
            "No field was found in the provided fieldMap for the given condition"
        );
    } else if (condition || fieldMap) {
        throw new Error(
            "Conditional Fieldsets must specify both a 'condition' and a 'fieldMap'"
        );
    }

    const fieldsetDataRef = useRef({ legend, fields: {}});

    function onFieldChange(fieldData) {
        const [name, value] = Object.entries(fieldData)[0];
        fieldsetDataRef.current.fields[name] = value;
        onFieldsetChange(fieldsetDataRef.current);
    }  

    return (
        <fieldset className={className}>
            {legend ? (
                <legend>{legend}</legend>
            ) : null}

            {fields ? fields.map((field, index) =>
                <Field 
                    className     = {fieldClassName}
                    key           = {index}
                    onFieldChange = {onFieldChange}
                    {...field}
                />
            ) : null}
        </fieldset>
    );
}