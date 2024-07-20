import { useState } from "react";

import useFieldErrors from "../../schematic-react-forms/Form/hooks";

export function useSignInFormValidation() {
    const [serverErrors, setServerErrors] = useState([]);
    const [fieldsetErrors, setFieldsetErrors] = useState({});

    const fieldErrors = useFieldErrors(fieldsetErrors);
    
    return { 
        fieldErrors,
        setFieldsetErrors,
        formErrors: [...serverErrors], 
        setServerErrors 
    };
}