import { useRef } from "react";

import registrationFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import { useRegistrationFormValidation } from "./hooks";

import { useErrors } from "../../schematic-react-forms/hooks";

import { useOnSubmit } from "../hooks";

import Form from "../../schematic-react-forms/Form";

export default function RegistrationForm({ Logs, Users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(registrationFieldsetSchemata);

    const fields = formData.credentials;
    const { 
        username, 
        email, 
        password, 
        confirmPassword 
    } = fields;

    const { 
        passwordErrors,
        validatePassword
    } = useRegistrationFormValidation({ password, confirmPassword });

    const { 
        isError,
        errors,
        formErrors,
        setFieldErrors, 
        setServerErrors 
    } = useErrors(passwordErrors);

    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    registrationFieldsetSchemata.initializeProps([{
        username: { ref: usernameRef },
        email   : { ref: emailRef },
        password: {
            onValidate: validatePassword,
            ref       : passwordRef
        },
        confirmPassword: {
            onValidate: validatePassword,
            ref       : confirmPasswordRef
        }
    }]);

    const handleOnSubmit = useOnSubmit(() => {
        const profile = { username };
        Users.createWithEmailAndPassword(
            profile, 
            email,
            password,
            setServerErrors
        );
    }, {
        isError,
        setServerErrors,
        Logs,
        errors,
        fields: Object.values(fields)
    });

    return (
        <Form 
            isError          = {isError}
            onSubmit         = {handleOnSubmit}
            errors           = {formErrors}
            fieldsetSchemata = {registrationFieldsetSchemata}
            onChange         = {handleOnFormChange}
            setFieldErrors   = {setFieldErrors}
            setServerErrors  = {setServerErrors}
        />
    );
}