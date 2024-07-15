import { useEffect, useState } from "react";

import Field from "../Field/Field";

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

    const [fieldsetData, setFieldsetData] = useState({ legend, fields: {}});
    
    function updateFieldsetData(fieldData) {
        setFieldsetData((prevFieldsetData) => {
            const [name, value] = Object.entries(fieldData)[0];
            if (prevFieldsetData.fields[name] !== value) {
                const newFields = {
                    ...prevFieldsetData.fields,
                    [name]: value
                };
                const newFieldsetData = {
                    ...prevFieldsetData,
                    fields: newFields
                };
                return newFieldsetData;
            }
            return prevFieldsetData; 
        });
    }  

    useEffect(() => {
        if (onChange) onChange(fieldsetData);
    }, [fieldsetData]);

    return (
        <fieldset className={className}>
            {legend ? (
                <legend>{legend}</legend>
            ) : null}

            {fields ? fields.map((field, index) =>
                <Field 
                    className          = {fieldClassName}
                    key                = {index}
                    updateFieldsetData = {updateFieldsetData}
                    {...field}
                />
            ) : null}
        </fieldset>
    );
}