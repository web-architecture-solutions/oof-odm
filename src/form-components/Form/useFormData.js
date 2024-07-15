import { useState } from "react";

export default function useFormData(formSchema) {
    const initialFormData = new Array(formSchema.length).fill({});
    const [formData, setFormData] = useState(initialFormData);
    function handleOnFormChange(index) {
        return (fieldsetData) => {
            setFormData((prevFormData) => {
                if (prevFormData[index] !== fieldsetData) {
                    const newFormData = [...formData];
                    newFormData[index] = fieldsetData;
                    return newFormData;
                }
                return formData;
            });
        };
    }
    return { formData, handleOnFormChange }
}