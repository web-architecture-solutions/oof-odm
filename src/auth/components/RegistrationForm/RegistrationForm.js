import { useRef } from "react";

import registrationFieldsetSchemata from "./registrationFieldsetSchemata";

import FormSchema from "../../../form-components/FormSchema";

import useFormData from "../../../form-components/Form/useFormData";

import useRegistrationFormValidation from "./useRegistrationFormValidation";

import Form from "../../../form-components/Form/Form";

import styles from "./RegistrationForm.module.css";

export default function RegistrationForm({ users }) {
    const registrationFormSchema = new FormSchema(registrationFieldsetSchemata);
    
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(registrationFormSchema.current);

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

    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    registrationFormSchema.props = [{
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
    }];

    return (
        <Form 
            className        = {styles.RegistrationForm}
            onSubmit         = {handleOnSubmit}
            errors           = {formErrors}
            fieldsetSchemata = {registrationFormSchema.current}
            onChange         = {handleOnFormChange}
        />
    );
}