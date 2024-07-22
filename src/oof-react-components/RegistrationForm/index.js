import { useRef } from "react";

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

    const [passwordErrors, validatePassword] = useValidation(() => {
        return [{
            condition: isPasswordMismatchError,
            error    : RegistrationError,
            code     : "oof-react-components/passwords-do-not-match",
            message  : "Passwords do not match"
        }];
    }, [isPasswordMismatchError]);

    function handleRegisterWithEmailAndPassword() {
        const profile = { username };
        Users.createWithEmailAndPassword(
            profile, 
            email,
            password,
            setServerErrors
        );
    }

    const usernameRef        = useRef();
    const emailRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    const { setServerErrors, formProps } = useFormSubmission({
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
        formErrors    : [...passwordErrors],
        onChange      : handleOnFormChange,
        onSubmit      : handleRegisterWithEmailAndPassword,
        Logs
    });

    return <Form {...formProps} />;
}