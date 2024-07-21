import { useRef } from "react";

import signInFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import Form from "../../schematic-react-forms/Form";

import { useFormSubmission } from "../hooks";

export default function SignInForm({ Logs, Users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(signInFieldsetSchemata);

    const { email, password } = formData.credentials;

    async function handleSignIn() {
        await Users.signInWithEmailAndPassword(
            email, 
            password,
            setServerErrors
        );
    }

    const emailRef    = useRef();
    const passwordRef = useRef();

    const formConfiguration = {
        fieldsetSchemata: signInFieldsetSchemata,
        fieldsetProps   : [{
            email   : { ref:    emailRef },
            password: { ref: passwordRef }
        }],
        requiredFields: [email, password],
        formErrors      : [],
        handleOnSubmit: handleSignIn,
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
            errors           = {formErrors}
            onSubmit         = {handleOnSubmit}
            onChange         = {handleOnFormChange}
            fieldsetSchemata = {signInFieldsetSchemata}
            setFieldErrors   = {setFieldErrors}
            setServerErrors  = {setServerErrors}
        />
    );
}