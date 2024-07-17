import { useRef } from "react";

import registrationFieldsetSchemata from "./registrationFieldsetSchemata";

import useFormData from "../../../form-components/Form/useFormData";

import useFormValidation from "../../../form-components/Form/useFormValidation";

import Form from "../../../form-components/Form/Form";

import { RegistrationError } from "../../errors";

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

    const [
        passwordErrors, 
        validatePassword
    ] = useFormValidation(() => {
        const  arePasswordsFalsy = !password && !confirmPassword;
        const _doPasswordsMatch  =  password === confirmPassword;
        const  doPasswordsMatch  = _doPasswordsMatch || arePasswordsFalsy;
        const  isPasswordSilly   
            =  password === "silly" || confirmPassword === "silly";
        return [{
            condition: !doPasswordsMatch,
            error    : RegistrationError,
            code     : "auth/passwords-do-not-match",
            message  : "Passwords do not match"
        }, {
            condition: isPasswordSilly,
            error    : RegistrationError,
            code     : "auth/password-is-silly",
            message  : "Password is too silly"
        }];
    }, [password, confirmPassword]);

    const formErrors = [...passwordErrors];

    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    registrationFieldsetSchemata.initializeProps([{
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
    }]);

    function handleOnSubmit() {
        const isFormError = formErrors.length === 0;
        if (
            !isFormError
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
            onSubmit         = {handleOnSubmit}
            errors           = {formErrors}
            fieldsetSchemata = {registrationFieldsetSchemata}
            onChange         = {handleOnFormChange}
        />
    );
}