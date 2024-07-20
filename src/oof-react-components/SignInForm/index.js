import { useRef } from "react";

import signInFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import { useSignInFormValidation } from "./hooks";

import Form from "../../schematic-react-forms/Form";

export default function SignInForm({ Users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(signInFieldsetSchemata);

    const { email, password } = formData.credentials;

    const { 
        fieldErrors,
        setFieldsetErrors,
        formErrors, 
        setServerErrors 
    } = useSignInFormValidation();

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
                errors            = {formErrors}
                onSubmit          = {handleSignIn}
                onChange          = {handleOnFormChange}
                fieldsetSchemata  = {signInFieldsetSchemata}
                fieldErrors       = {fieldErrors}
                setFieldsetErrors = {setFieldsetErrors}
            />
        </>
    );
}