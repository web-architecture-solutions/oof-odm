import { useEffect } from "react";
import Field from "../Field/Field";

import { aggregateFields } from "../util";

export default function Fieldset({ 
    legend,
    className      = "",
    fieldClassName = "",
    fields         = null,
    fieldMap       = null,
    condition      = null,
    onChange       = null
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

    useEffect(() => {
        if (onChange) {
            const fieldsetData = aggregateFields(fields);
            onChange(fieldsetData);
        }
    }, [onChange, fields])
    

    return (
        <fieldset className={className}>
            {legend ? (
                <legend>{legend}</legend>
            ) : null}

            {fields ? fields.map((field, index) =>
                <Field 
                    className            = {fieldClassName}
                    key                  = {index}
                    onFieldsetChange     = {onChange}
                    {...field}
                />
            ) : null}
        </fieldset>
    );
}