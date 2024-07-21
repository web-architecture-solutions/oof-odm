import { useRef } from "react";

import signInFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import { useErrors } from "../../schematic-react-forms/hooks";

import Form from "../../schematic-react-forms/Form";

export default function SignInForm({ Users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(signInFieldsetSchemata);

    const { email, password } = formData.credentials;

    const { 
        isError,
        errors,
        setFieldErrors, 
        setServerErrors 
    } = useErrors([]);

    const emailRef    = useRef();
    const passwordRef = useRef();

    signInFieldsetSchemata.initializeProps([{
        email   : { ref:    emailRef },
        password: { ref: passwordRef }
    }]);

    async function handleSignIn() {
        await Users.signInWithEmailAndPassword(
            email, 
            password,
            setServerErrors
        );    
    }

    return (
        <>
            <Form 
                isError          = {isError}
                errors           = {errors}
                onSubmit         = {handleSignIn}
                onChange         = {handleOnFormChange}
                fieldsetSchemata = {signInFieldsetSchemata}
                setFieldErrors   = {setFieldErrors}
            />
        </>
    );
}