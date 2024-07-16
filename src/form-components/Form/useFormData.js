import { useState } from "react";

export default function useFormData(formSchema) {
    const initialFormData = formSchema.map((fieldset) => {
        const fields = fieldset.fields.map(({ name }) => ({ [name]: null }));
        return { ...fieldset, fields };
    })
    const [formData, setFormData] = useState(initialFormData);
    function handleOnFormChange(index) {
        return (fieldsetData) => {
            setFormData((prevFormData) => {
                if (prevFormData[index] !== fieldsetData) {
                    const newFormData = [...prevFormData];
                    newFormData[index] = fieldsetData;
                    return newFormData;
                }
                return prevFormData;
            });
        };
    }
    return { formData, handleOnFormChange }
}