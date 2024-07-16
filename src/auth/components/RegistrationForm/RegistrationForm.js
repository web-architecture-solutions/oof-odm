import { useRef } from "react";

import Form from "../../../form-components/Form/Form";

import registrationFieldsetSchemata from "./registrationFieldsetSchemata";

import useFormData                  from "../../../form-components/Form/useFormData";
import useFieldsetSchemataWithProps from "../../../form-components/Form/useFieldsetSchemataWithProps";

import useRegistrationFormValidation from "./useRegistrationFormValidation";

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
    } = formData.createUserProfile.fields;

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

    const registrationFieldsetSchemataWithProps = useFieldsetSchemataWithProps(
        registrationFieldsetSchemata, 
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
            className        = {styles.RegistrationForm}
            onSubmit         = {handleSubmitRegistration}
            errors           = {formErrors}
            fieldsetSchemata = {registrationFieldsetSchemataWithProps}
            onChange         = {handleOnFormChange}
        />
    );
}