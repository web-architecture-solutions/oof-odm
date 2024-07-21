import Form from "../../schematic-react-forms/Form";

import { useFormSubmission } from "../hooks";

export default function OOFForm({ 
    fieldsetSchemata,
    fieldsetProps,
    requiredFields,
    formErrors,
    onChange,
    onSubmit: _handleOnSubmit,
    Logs = null 
}) {   
    const { 
        isError,
        errors, 
        setFieldErrors, 
        setServerErrors, 
        handleOnSubmit 
    } = useFormSubmission({
        fieldsetSchemata,
        fieldsetProps,
        requiredFields,
        formErrors,
        _handleOnSubmit,
        Logs
    });

    return (
        <Form 
            isError          = {isError}
            onSubmit         = {handleOnSubmit}
            errors           = {errors}
            fieldsetSchemata = {fieldsetSchemata}
            onChange         = {onChange}
            setFieldErrors   = {setFieldErrors}
            setServerErrors  = {setServerErrors}
        />
    );
}