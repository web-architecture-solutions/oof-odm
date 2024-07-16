import { useRef } from "react";

import Form from "../../../form-components/Form/Form";

import registrationFormSchema from "./registrationFormSchema";

import useFormData            from "../../../form-components/Form/useFormData";
import useFormSchemaWithProps from "../../../form-components/Form/useFormSchemaWithProps";

import useRegistrationFormValidation from "./useRegistrationFormValidation";

import styles from "./RegistrationForm.module.css";

export default function RegistrationForm({ users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(registrationFormSchema);

    const createUserProfileFieldset = formData.createUserProfile;
    const createUserProfileFields   = createUserProfileFieldset.fields;

    const { 
        username, 
        email, 
        password, 
        confirmPassword 
    } = createUserProfileFields;

    const { 
        formErrors, 
        validatePassword 
    } = useRegistrationFormValidation({ password, confirmPassword });

    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    const registrationFieldProps = [{
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

    const registrationFormSchemaWithProps = useFormSchemaWithProps(
        registrationFormSchema, 
        registrationFieldProps
    );

    function handleSubmitRegistration () {
        if (
            formErrors.length === 0
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
            className = {styles.RegistrationForm}
            onSubmit  = {handleSubmitRegistration}
            errors    = {formErrors}
            schema    = {registrationFormSchemaWithProps}
            onChange  = {handleOnFormChange}
        />
    );
}