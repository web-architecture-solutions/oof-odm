import { useRef } from "react";

import registrationFieldsetSchemata from "./registrationFieldsetSchemata";

import useFormData from "../../../form/useFormData";
import Form        from "../../../form/components/Form/Form";

import useRegistrationFormValidation from "./useRegistrationFormValidation"

import { AND } from "../../../logic";

import styles from "./RegistrationForm.module.css";

export default function RegistrationForm({ users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(registrationFieldsetSchemata);

    const { 
        username, 
        email, 
        password, 
        confirmPassword 
    } = formData.credentials.fields;

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
            onChange: validatePassword,
            ref     : passwordRef
        },
        confirmPassword: {
            onChange: validatePassword,
            ref     : confirmPasswordRef
        }
    }]);

    function handleOnSubmit() {
        const isFormError = formErrors.length === 0;
        if (AND(!isFormError, username, email, password)) {
            const profile = { username };
            users.createWithEmailAndPassword(
                profile, 
                email,
                password
            );
        }
    }

    return (
        <Form 
            className        = {styles.RegistrationForm}
            onSubmit         = {handleOnSubmit}
            errors           = {formErrors}
            fieldsetSchemata = {registrationFieldsetSchemata}
            onChange         = {handleOnFormChange}
        />
    );
}