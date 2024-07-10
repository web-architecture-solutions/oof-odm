import { useRef } from "react";

import Form     from "../../../form-components/Form/Form";
import Fieldset from "../../../form-components/Fieldset/Fieldset";

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
        errorCode,
        setErrorCode, 
        errorMessage 
    } = useRegistrationFormValidation({ 
        usernameRef,
        emailRef,
        passwordRef,
        confirmPasswordRef
    });

    const profile = useProfile({ usernameRef });

    function handleRegistration () {
        if (
            !errorCode
            && usernameRef.current.value 
            && emailRef.current.value 
            && passwordRef.current.value
        ) {
            users.createWithEmailAndPassword(
                profile, 
                emailRef.current.value, 
                passwordRef.current.value, 
                setErrorCode
            );
        }
    }

    const registrationFields = useRegistrationFields({
        usernameRef,
        emailRef,
        passwordRef,
        confirmPasswordRef
    });

    return (
        <Form 
            className    = {styles.RegistrationForm}
            onSubmit     = {handleRegistration}
            errorMessage = {errorMessage}
        >
            <Fieldset
                legend = "Register"
                fields = {registrationFields}
            />
        </Form>
    );
}