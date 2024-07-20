import useFieldErrors from "../../schematic-react-forms/Form/hooks";

export function useSignInFormValidation() {
    const { 
        fieldErrors, 
        serverErrors, 
        setFieldsetErrors, 
        setServerErrors 
    } = useFieldErrors();
    
    return { 
        fieldErrors,
        setFieldsetErrors,
        formErrors: [...serverErrors], 
        setServerErrors 
    };
}