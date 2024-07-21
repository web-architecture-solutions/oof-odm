import { useCallback, useRef } from "react";

import { useValidation } from "../../schematic-react-forms/hooks";

import registrationFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import { RegistrationError } from "../errors";

import { useFormSubmission } from "../hooks";

import Form from "../../schematic-react-forms/Form";

export default function RegistrationForm({ Logs, Users }) {   
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(registrationFieldsetSchemata);

    const { 
        username, 
        email, 
        password, 
        confirmPassword 
    } = formData.credentials;

    const arePasswordsFalsy       = !password && !confirmPassword;
    const doPasswordsMatch        =  password === confirmPassword;
    const isPasswordMismatchError = !arePasswordsFalsy && !doPasswordsMatch;

    const _validatePassword = useCallback(() => {
        return [{
            condition: isPasswordMismatchError,
            error    : RegistrationError,
            code     : "oof-react-components/passwords-do-not-match",
            message  : "Passwords do not match"
        }];
    }, [isPasswordMismatchError]);

    function _handleOnSubmit() {
        const profile = { username };
        Users.createWithEmailAndPassword(
            profile, 
            email,
            password,
            setServerErrors
        );
    }

    const [passwordErrors, validatePassword] = useValidation(_validatePassword);

    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    const formConfiguration = {
        fieldsetSchemata: registrationFieldsetSchemata,
        fieldsetProps   : [{
            username: { ref: usernameRef },
            email   : { ref: emailRef },
            password: {
                onValidate: validatePassword,
                ref       : passwordRef
            },
            confirmPassword: {
                onValidate: validatePassword,
                ref       : confirmPasswordRef
            }
        }],
        requiredFields: [username, email, password, confirmPassword],
        formErrors      : [...passwordErrors],
        handleOnSubmit: _handleOnSubmit,
        Logs
    };

    const { 
        isError,
        formErrors, 
        setFieldErrors, 
        setServerErrors, 
        handleOnSubmit 
    } = useFormSubmission(formConfiguration);

    return (
        <Form 
            isError          = {isError}
            onSubmit         = {handleOnSubmit}
            errors           = {formErrors}
            fieldsetSchemata = {registrationFieldsetSchemata}
            onChange         = {handleOnFormChange}
            setFieldErrors   = {setFieldErrors}
            setServerErrors  = {setServerErrors}
        />
    );
}