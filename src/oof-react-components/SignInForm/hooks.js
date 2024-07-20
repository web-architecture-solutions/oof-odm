import useErrors from "../../schematic-react-forms/hooks";

export function useSignInFormValidation() {
    const { 
        fieldErrors, 
        serverErrors, 
        setFieldsetErrors, 
        setServerErrors 
    } = useErrors();
    
    return { 
        fieldErrors,
        setFieldsetErrors,
        formErrors: [...serverErrors], 
        setServerErrors 
    };
}