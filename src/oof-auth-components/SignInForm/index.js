import { useRef } from "react";

import signInFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-hook-form/hooks";

import Form from "../../schematic-hook-form/Form";

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

    async function handleSignIn() {
        await Users.signInWithEmailAndPassword(
            email, 
            password
        );    
    }

    return (
        <Form 
            onSubmit         = {handleSignIn}
            onChange         = {handleOnFormChange}
            fieldsetSchemata = {signInFieldsetSchemata}
        />
    );
}