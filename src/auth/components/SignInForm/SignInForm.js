import { useRef } from "react";

import signInFieldsetSchemata from "./signInFieldsetSchemata";

import Form from "../../../form/components/Form/Form";

import useFormData from "../../../form/useFormData";

export default function SignInForm({ users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(signInFieldsetSchemata);

    const { email, password } = formData.signIn.fields;

    const emailRef    = useRef();
    const passwordRef = useRef();

    signInFieldsetSchemata.initializeProps([{
        email   : { ref: emailRef },
        password: { ref: passwordRef}
    }]);

    async function handleSignIn() {
        await users.signInWithEmailAndPassword(
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