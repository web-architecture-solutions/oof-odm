import { useRef } from "react";

import Form from "../../../form-components/Form/Form";

import registrationFormSchema from "./registrationFormSchema";

import useRegistrationFormValidation from "./useRegistrationFormValidation";

import useFormData from "../../../form-components/Form/useFormData";

import styles from "./RegistrationForm.module.css";

function useEnrichedFormSchema(registrationFormSchema, registrationFormControls) {
    const enrichedRegistrationFormSchema = registrationFormSchema.map((fieldset, index) => {
        const fieldsetControls   = registrationFormControls[index];
        const fieldsWithControls = fieldset.fields.map((field) => {
            const fieldControls = fieldsetControls[field.name];
            return { ...field, ...fieldControls };
        });
        const newFieldset = { ...fieldset, fields: fieldsWithControls };
        return newFieldset;
    });
    return enrichedRegistrationFormSchema;
}

export default function RegistrationForm({ users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(registrationFormSchema);

    const { 
        formErrors, 
        validatePassword 
    } = useRegistrationFormValidation(formData);
    
    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    const registrationFormControls = [{
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

    const enrichedRegistrationFormSchema = useEnrichedFormSchema(
        registrationFormSchema, 
        registrationFormControls
    );

    function handleSubmitRegistration () {
        const { username, email, password } = formData[0].fields;
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
            schema    = {enrichedRegistrationFormSchema}
            onChange  = {handleOnFormChange}
        />
    );
}