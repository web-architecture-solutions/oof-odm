import { useRef } from "react";

import signInFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import { useErrors } from "../../schematic-react-forms/hooks";

import { useOnSubmit } from "../hooks";

import Form from "../../schematic-react-forms/Form";

export default function SignInForm({ Logs, Users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(signInFieldsetSchemata);

    const fields = formData.credentials;
    const { email, password } = fields;

    const { 
        isError,
        errors,
        formErrors,
        setFieldErrors, 
        setServerErrors 
    } = useErrors([]);

    const emailRef    = useRef();
    const passwordRef = useRef();

    signInFieldsetSchemata.initializeProps([{
        email   : { ref:    emailRef },
        password: { ref: passwordRef }
    }]);

    const handleSignIn = useOnSubmit(async () => {
        await Users.signInWithEmailAndPassword(
            email, 
            password,
            setServerErrors
        );
    }, {
        isError,
        setServerErrors,
        Logs,
        errors,
        fields: Object.values(fields)
    });

    return (
        <Form 
            isError          = {isError}
            errors           = {formErrors}
            onSubmit         = {handleSignIn}
            onChange         = {handleOnFormChange}
            fieldsetSchemata = {signInFieldsetSchemata}
            setFieldErrors   = {setFieldErrors}
            setServerErrors  = {setServerErrors}
        />
    );
}