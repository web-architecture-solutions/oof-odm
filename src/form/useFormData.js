import { useState } from "react";

export default function useFormData(fieldsetSchemata) {
    const _initialFormDataRecords = fieldsetSchemata.map((fieldsetSchema) => {
        const fieldRecords = fieldsetSchema.fields.map(({ name }) => ([name, null]));
        const fields       = Object.fromEntries(fieldRecords);
        return [fieldsetSchema.name, fields];
    });
    const initialFormData = Object.fromEntries(_initialFormDataRecords);
    const [formData, setFormData] = useState(initialFormData);
    function handleOnFormChange(index) {
        return (fieldsetData) => {
            setFormData((prevFormData) => {
                const fieldsetName = fieldsetSchemata[index].name;
                if (prevFormData[fieldsetName] !== fieldsetData) {
                    const newFormData = { ...prevFormData };
                    newFormData[fieldsetName] = fieldsetData;
                    return newFormData;
                }
                return prevFormData;
            });
        };
    }
    return { formData, handleOnFormChange };
}