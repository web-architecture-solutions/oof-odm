import { useRef } from "react";

import Form from "../../../form-components/Form/Form";

import registrationFormSchema from "./registrationFormSchema";

import useFormData           from "../../../form-components/Form/useFormData";
import useEnrichedFormSchema from "../../../form-components/Form/useEnrichedFormData";

import styles from "./RegistrationForm.module.css";

import { useCallback, useReducer } from "react";

import { PasswordError } from "../../errors";

const initialErrors = { "auth/passwords-do-not-match": null };

function errorReducer(formErrors, error) {
    return error === null ? { 
        ...formErrors, 
        "auth/passwords-do-not-match": null  
    } : { 
        ...formErrors, 
        [error.code]: error 
    };
}

export default function RegistrationForm({ users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(registrationFormSchema);
    
    const [
        _formErrors, 
        dispatchError
    ] = useReducer(errorReducer, initialErrors);

    const { password, confirmPassword } = formData[0].fields;

    const validatePassword = useCallback(() => {
        const doPasswordsMatch = password === confirmPassword;
        const passwordsDoNotMatchError = !doPasswordsMatch
            ? new PasswordError({
                code   : "auth/passwords-do-not-match",
                message: "Passwords do not match",
            })
            : null;
        dispatchError(passwordsDoNotMatchError);
    }, [password, confirmPassword]);

    const formErrors = Object.values(_formErrors).filter(Boolean);

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