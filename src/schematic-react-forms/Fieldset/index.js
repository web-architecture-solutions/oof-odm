import { useEffect, useState } from "react";

import Field from "../Field";

export default function Fieldset({ 
    name,
    legend,
    className             = "",
    fieldClassName        = "",
    fieldMap              = null,
    condition             = null,
    onChange              = null,
    fields: fieldSchemata = null,
    setServerErrors,
    updateFormErrors
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

    const initialFieldsetData = fieldSchemata.initialValues;
    
    const [fieldsetData  ,   setFieldsetData] = useState(initialFieldsetData);
    const [fieldsetErrors, setFieldsetErrors] = useState({});
    
    useEffect(() => {
        updateFormErrors({ [name]: fieldsetErrors });
    }, [name, fieldsetErrors, updateFormErrors]);

    function updateFieldsetData(fieldData) {
        setFieldsetData((prevFieldsetData) => {
            const [name, value] = Object.entries(fieldData)[0];
            if (prevFieldsetData[name] !== value) {
                const newFields = {
                    ...prevFieldsetData,
                    [name]: value
                };
                const newFieldsetData = {
                    ...prevFieldsetData,
                    ...newFields
                };
                return newFieldsetData;
            }
            return prevFieldsetData; 
        });
    }  

    function updateFieldsetErrors(fieldErrorObject) {
        setFieldsetErrors((prevFieldsetErrors) => {
            const [fieldName, fieldErrors] = Object.entries(fieldErrorObject)[0];
            if (prevFieldsetErrors[fieldName] !== fieldErrors) {
                return { 
                    ...prevFieldsetErrors,
                    [fieldName]: fieldErrors
                };
            }
            return prevFieldsetErrors;
        });
    }

    useEffect(() => {
        setServerErrors([]);
    }, [fieldsetData, setServerErrors]);

    useEffect(() => {
        if (onChange) onChange(fieldsetData);
    }, [onChange, fieldsetData]);

    return (
        <fieldset className={className}>
            {legend ? <legend>{legend}</legend> : null}

            {fieldSchemata ? fieldSchemata.map((fieldSchema, index) =>
                <Field 
                    className            = {fieldClassName}
                    key                  = {index}
                    updateFieldsetData   = {updateFieldsetData}
                    updateFieldsetErrors = {updateFieldsetErrors}
                    {...fieldSchema}
                />
            ) : null}
        </fieldset>
    );
}