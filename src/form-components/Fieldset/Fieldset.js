import { useEffect } from "react";
import Field from "../Field/Field";

import { useKey } from "../hooks";

import { aggregateFields } from "../util";

export default function Fieldset({ 
    legend,
    className      = "",
    fieldClassName = "",
    fields         = null,
    fieldMap       = null,
    condition      = null,
    onChange       = null,
    incrementFormKey
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

    const { key, incrementKey } = useKey();

    useEffect(() => {
        if (onChange) {
            const fieldsetData = aggregateFields(fields);
            onChange(fieldsetData);
        }
    }, [onChange, fields])
    

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
                    onFieldsetChange     = {onChange}
                    {...field}
                />
            ) : null}
        </fieldset>
    );
}