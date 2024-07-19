import { useRef, useState } from "react";

import signInFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import Form from "../../schematic-react-forms/Form";

export default function SignInForm({ Users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(signInFieldsetSchemata);

    const { email, password } = formData.credentials;

    const emailRef    = useRef();
    const passwordRef = useRef();

    signInFieldsetSchemata.initializeProps([{
        email   : { ref:    emailRef },
        password: { ref: passwordRef }
    }]);

    const [serverError, setServerError] = useState(null);

    async function handleSignIn() {
        await Users.signInWithEmailAndPassword(
            email, 
            password,
            setServerError
        );    
    }

    return (
        <>
            <Form 
                serverError      = {serverError}
                onSubmit         = {handleSignIn}
                onChange         = {handleOnFormChange}
                fieldsetSchemata = {signInFieldsetSchemata}
            />
        </>
    );
}