import Form from "../../../form-components/Form/Form";

import useRegistrationFields         from "./useRegistrationFields";
import useRegistrationFormValidation from "./useRegistrationFormValidation";

import styles from "./RegistrationForm.module.css";

import { useEffect } from "react";

import useFormData from "../../../form-components/Form/useFormData";

function findRefByName(array, _name) {
    return array.find(({ name }) => {
        return name === _name;
    })?.ref;
}

export default function RegistrationForm({ users }) {
    const _registrationFields = useRegistrationFields();

    const passwordRef        = findRefByName(_registrationFields, "password");
    const confirmPasswordRef = findRefByName(_registrationFields, "confirmPassword");

    const { 
        formErrors, 
        validatePassword 
    } = useRegistrationFormValidation({ 
        passwordRef,
        confirmPasswordRef
    });

    const registrationFields = _registrationFields.map((field) => {
        if (field.name === "password" || field.name === "confirmPassword") {
            return { ...field, onChange: validatePassword };
        }
        return field;
    });

    const registrationFieldsets = [{
        legend: "Register",
        fields: registrationFields
    }];

    const { formData, handleOnFormChange } = useFormData(registrationFieldsets);
    
    useEffect(() => {
        console.log(formData)
    }, [formData]);

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
            fieldsets = {registrationFieldsets}
            onChange  = {handleOnFormChange}
        />
    );
}