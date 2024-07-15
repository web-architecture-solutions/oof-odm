import { useState } from "react";

export default function useFormData(formLength) {
    const initialFormData = new Array(formLength).fill({});

    const [formData, setFormData] = useState(initialFormData)

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