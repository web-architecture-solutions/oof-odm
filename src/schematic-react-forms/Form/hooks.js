import { useState } from "react";

function fieldsetErrorReducer(
    accumulatedFieldsetErrors, 
    currentFieldsetErrors
) {
    const flattendFieldsetErrors = Object.values(currentFieldsetErrors).flat();
    return [...accumulatedFieldsetErrors, ...flattendFieldsetErrors];
}

export default function useFieldErrors() {
    const [serverErrors  ,   setServerErrors] = useState([]);
    const [fieldsetErrors, setFieldsetErrors] = useState({});
    
    const fieldErrors = Object.values(fieldsetErrors).reduce(fieldsetErrorReducer, []);

    return { fieldErrors, serverErrors, setFieldsetErrors, setServerErrors };
}