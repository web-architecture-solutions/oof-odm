import { useRef } from "react";

import registrationFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import { useRegistrationFormValidation } from "./hooks";

import { useErrors } from "../../schematic-react-forms/hooks";

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

    function handleOnSubmit() {
        if (isError) {
            Logs.add({
                code   : "auth/front-end-validation-error",
                message: "There are unhandled errors",
                note   : "Check Form component implementation",
                errors : errors.map(({ code, message }) => {
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
        } else {
            Logs.add({
                code   : "auth/front-end-validation-error",
                message: "There are unhandled errors",
                note   : "Check useError hook implementation",
                errors : errors.map(({ code, message }) => {
                    return { code, message };
                })
            });
        }
    }

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