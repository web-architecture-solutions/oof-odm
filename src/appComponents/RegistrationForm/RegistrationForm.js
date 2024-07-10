import { useEffect, useRef, useState } from "react";

import { ErrorMessage } from "../../constants";

import Form     from "../../FormComponents/Form/Form";
import Fieldset from "../../FormComponents/Fieldset/Fieldset";

import useRegistrationFields from "./useRegistrationFields";

import styles from "./RegistrationForm.module.css";

export default function RegistrationForm({ users }) {
    const [errorCode   , setErrorCode           ] = useState(null);
    const [errorMessage, setErrorMessage        ] = useState(null);

    useEffect(() => {
        const errorMessage = errorCode ? ErrorMessage[errorCode] : "";
        setErrorMessage(errorMessage);
    }, [errorCode]);

    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    useEffect(() => {
        setErrorCode(null);
    }, [usernameRef, emailRef]);

    useEffect(() => {
        const errorCode 
            = passwordRef.current.value !== confirmPasswordRef.current.value 
                ? "auth/passwords-do-not-match" 
                : null;
        setErrorCode(errorCode);    
    }, [passwordRef, confirmPasswordRef]);

    function handleRegistration () {
        if (
            usernameRef.current.value 
            && emailRef.current.value 
            && passwordRef.current.value
        ) {
            const profile = { username: usernameRef.current.value };
            users.createWithEmailAndPassword(
                profile, 
                emailRef.current.value, 
                passwordRef.current.value, 
                null,
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
            className = {styles.RegistrationForm}
            onSubmit  = {handleRegistration}
        >
            <Fieldset
                legend = "Register"
                fields = {registrationFields}
            />
        </Form>
    );
}