import Form from "../../../form-components/Form/Form";

import useProfile                    from "./useProfile";
import useRegistrationFields         from "./useRegistrationFields";
import useRegistrationFormValidation from "./useRegistrationFormValidation";

import styles from "./RegistrationForm.module.css";
import { useEffect, useState } from "react";

function findRefByName(array, _name) {
    return array.find(({ name }) => {
        return name === _name;
    })?.ref;
}

export default function RegistrationForm({ users }) {
    const _registrationFields = useRegistrationFields();

    const usernameRef        = findRefByName(_registrationFields, "username");
    const emailRef           = findRefByName(_registrationFields, "email");
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

    const profile = useProfile({ usernameRef });

    function handleRegistration () {
        if (
            formErrors.length === 0
            && usernameRef.current.value 
            && emailRef.current.value 
            && passwordRef.current.value
        ) {
            users.createWithEmailAndPassword(
                profile, 
                emailRef.current.value, 
                passwordRef.current.value
            );
        }
    }

    const [foo, setFoo] = useState();
    const [key, setKey] = useState(0)

    useEffect(() => {
        console.log("FOO");
    }, [foo])

    return (
        <Form 
            className = {styles.RegistrationForm}
            onSubmit  = {handleRegistration}
            errors    = {formErrors}
            fieldsets = {registrationFieldsets}
            onChange  = {(formData) => {
                setFoo(formData);
                console.log(foo);
            }}
        />
    );
}