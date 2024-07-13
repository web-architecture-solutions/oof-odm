import { useRef } from "react";

import Form     from "../../../form-components/Form/Form";

import useProfile                    from "./useProfile";
import useRegistrationFields         from "./useRegistrationFields";
import useRegistrationFormValidation from "./useRegistrationFormValidation";

import styles from "./RegistrationForm.module.css";

export default function RegistrationForm({ users }) {
    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();   

    const { 
        formErrors, 
        validatePassword 
    } = useRegistrationFormValidation({ 
        passwordRef,
        confirmPasswordRef
    });

    const profile = useProfile({ usernameRef });

    const registrationFields = useRegistrationFields({
        usernameRef,
        emailRef,
        passwordRef,
        confirmPasswordRef,
        validatePassword,
    });

    const registrationFieldsets = [{
        legend: "Register",
        fields: registrationFields
    }];

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

    return (
        <Form 
            className  = {styles.RegistrationForm}
            onSubmit   = {handleRegistration}
            errors     = {formErrors}
            fieldsets  = {registrationFieldsets}
            onChange   = {(foo) => console.log(foo)}
        />
    );
}