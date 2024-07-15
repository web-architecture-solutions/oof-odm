import { useEffect, useState } from "react";

import Field from "../Field/Field";

export default function Fieldset({ 
    legend,
    className             = "",
    fieldClassName        = "",
    fieldMap              = null,
    condition             = null,
    onChange              = null,
    fields: fieldSchemata = null,
}) {
    if (condition && fieldMap && fieldMap[condition]) {
        fieldSchemata = fieldMap[condition];
    } else if (condition && fieldMap) {
        throw new Error(
            "No field was found in the provided fieldMap for the given condition"
        );
    } else if (condition || fieldMap) {
        throw new Error(
            "Conditional Fieldsets must specify both a 'condition' and a 'fieldMap'"
        );
    }

    const initialFieldRecords = fieldSchemata.map(({ name }) => [name, null]);
    const initialFields       = Object.fromEntries(initialFieldRecords);
    const initialFieldsetData = { legend, fields: initialFields }
    
    const [fieldsetData, setFieldsetData] = useState(initialFieldsetData);
    
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
    }, [onChange, fieldsetData]);

    return (
        <fieldset className={className}>
            {legend ? (
                <legend>{legend}</legend>
            ) : null}

            {fieldSchemata ? fieldSchemata.map((fieldSchema, index) =>
                <Field 
                    className          = {fieldClassName}
                    key                = {index}
                    updateFieldsetData = {updateFieldsetData}
                    {...fieldSchema}
                />
            ) : null}
        </fieldset>
    );
}