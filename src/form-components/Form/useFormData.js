import { useState } from "react";

export default function useFormData(formSchema) {
    const _initialFormDataRecords = formSchema.map((fieldset) => {
        const fieldRecords = fieldset.fields.map(({ name }) => ([name, null]));
        const fields       = Object.fromEntries(fieldRecords);
        return [fieldset.name, { ...fieldset, fields }];
    });
    const initialFormData = Object.fromEntries(_initialFormDataRecords);
    const [formData, setFormData] = useState(initialFormData);
    function handleOnFormChange(index) {
        return (fieldsetData) => {
            setFormData((prevFormData) => {
                const fieldsetName = formSchema[index].name;
                if (prevFormData[fieldsetName] !== fieldsetData) {
                    const newFormData = { ...prevFormData };
                    newFormData[fieldsetName] = fieldsetData;
                    return newFormData;
                }
                return prevFormData;
            });
        };
    }
    return { formData, handleOnFormChange }
}