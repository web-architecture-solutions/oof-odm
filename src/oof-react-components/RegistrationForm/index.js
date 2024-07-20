import { useRef, useState } from "react";

import registrationFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import Form from "../../schematic-react-forms/Form";

import { useRegistrationFormValidation } from "./hooks"

export default function RegistrationForm({ Users }) {
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
        validatePassword 
    } = useRegistrationFormValidation({ password, confirmPassword });

    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    registrationFieldsetSchemata.initializeProps([{
        username: { ref: usernameRef },
        email   : { ref: emailRef },
        password: {
            validate: validatePassword,
            ref     : passwordRef
        },
        confirmPassword: {
            validate: validatePassword,
            ref     : confirmPasswordRef
        }
    }]);

    

    const [serverErrors, setServerErrors] = useState([]);

    function handleOnSubmit() {
        const isFormError = formErrors.length > 0;
        if (isFormError) {
            // TODO: Handle logging and reporting error to user
            console.error(
                "There are unhandled form errors preventing submission:",
                ...formErrors
            );
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
            onSubmit         = {handleOnSubmit}
            errors           = {[...formErrors, ...serverErrors]}
            fieldsetSchemata = {registrationFieldsetSchemata}
            onChange         = {handleOnFormChange}
        />
    );
}