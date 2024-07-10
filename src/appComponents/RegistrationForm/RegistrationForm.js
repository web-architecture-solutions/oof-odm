import { useEffect, useRef, useState } from "react";

import { ErrorMessage } from "../../constants";

import Form     from "../../FormComponents/Form/Form";
import Fieldset from "../../FormComponents/Fieldset/Fieldset";

import useRegistrationFields from "./useRegistrationFields";

import styles from "./RegistrationForm.module.css";

export default function RegistrationForm({ users }) {
    const [username            , setUsername            ] = useState("");
    const [email               , setEmail               ] = useState("");
    const [password            , setPassword            ] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errorCode           , setErrorCode           ] = useState(null);
    const [errorMessage        , setErrorMessage        ] = useState(null);

    useEffect(() => {
        setErrorCode(null);
    }, [username, email]);

    useEffect(() => {
        const errorMessage = errorCode ? ErrorMessage[errorCode] : "";
        setErrorMessage(errorMessage);
    }, [errorCode]);

    useEffect(() => {
        const errorCode 
            = password !== passwordConfirmation 
                ? "auth/passwords-do-not-match" 
                : null;
        setErrorCode(errorCode);    
    }, [password, passwordConfirmation]);

    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    const registrationFields = useRegistrationFields({
        usernameRef,
        emailRef,
        passwordRef,
        confirmPasswordRef
    });

    function handleRegistration () {
        if (username && email && password) {
            const profile = { username };
            users.createWithEmailAndPassword(
                profile, 
                email, 
                password, 
                null,
                setErrorCode
            );
        }
    }

    return (
        <Form className={styles.RegistrationForm} onSubmit={handleRegistration}>
            <Fieldset
                legend = "Register"
                fields = {registrationFields}
            />
        </Form>
    );
}