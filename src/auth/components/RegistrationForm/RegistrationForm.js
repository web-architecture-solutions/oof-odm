import { useRef } from "react";

import _registrationFieldsetSchemata from "./_registrationFieldsetSchemata";

import FieldsetSchemata from "../../../form-components/FieldsetSchemata";

import useFormData from "../../../form-components/Form/useFormData";

import useRegistrationFormValidation from "./useRegistrationFormValidation";

import Form from "../../../form-components/Form/Form";

import styles from "./RegistrationForm.module.css";

export default function RegistrationForm({ users }) {
    const registrationFieldsetSchemata 
        = new FieldsetSchemata(..._registrationFieldsetSchemata);
    
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(registrationFieldsetSchemata);

    const { 
        username, 
        email, 
        password, 
        confirmPassword 
    } = formData.createUserProfile.fields;

    const { 
        formErrors, 
        validatePassword 
    } = useRegistrationFormValidation({ 
        password, 
        confirmPassword 
    });

    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    registrationFieldsetSchemata.initializeProps([{
        username: {
            ref: usernameRef
        },
        email: {
            ref: emailRef
        },
        password: {
            onChange: validatePassword,
            ref     : passwordRef
        },
        confirmPassword: {
            onChange: validatePassword,
            ref     : confirmPasswordRef
        }
    }]);

    function handleOnSubmit () {
        const isFormError = formErrors.length === 0;
        if (
            !isFormError
            && username 
            && email
            && password
        ) {
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