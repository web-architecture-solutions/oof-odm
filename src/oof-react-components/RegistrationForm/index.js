import { useRef } from "react";

import registrationFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import { useRegistrationFormValidation } from "./hooks";

import Form from "../../schematic-react-forms/Form";

export default function RegistrationForm({ Logs, Users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(registrationFieldsetSchemata);

    const { 
        username, 
        email, 
        password, 
        confirmPassword 
    } = formData.credentials;

    const { 
        formErrors, 
        validatePassword,
        setServerErrors,
        fieldErrors,
        setFieldsetErrors
    } = useRegistrationFormValidation({ password, confirmPassword });

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

    function handleOnSubmit() {
        // TODO: add log handling for fieldErrors
        const isFormError = formErrors.length > 0;
        if (isFormError) {
            Logs.add({
                code      : "auth/front-end-validation-error",
                message   : "There are unhandled form errors",
                formErrors: formErrors.map(({ code, message }) => {
                    return { code, message };
                })
            });
        } else if (username && email && password) {
            const profile = { username };
            Users.createWithEmailAndPassword(
                profile, 
                email,
                password,
                setServerErrors
            );
        }
    }

    return (
        <Form 
            onSubmit          = {handleOnSubmit}
            errors            = {formErrors}
            fieldsetSchemata  = {registrationFieldsetSchemata}
            onChange          = {handleOnFormChange}
            fieldErrors       = {fieldErrors}
            setFieldsetErrors = {setFieldsetErrors}
        />
    );
}