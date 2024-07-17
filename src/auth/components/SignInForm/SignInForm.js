import { useRef } from "react";

import Form from "../../../form/components/Form/Form";

import useSignInFields from "./useSignInFields";

export default function SignInForm({ users }) {
    const emailRef    = useRef();
    const passwordRef = useRef();

    const signInFields = useSignInFields({ 
        emailRef, 
        passwordRef 
    }); 
    
    const signInFieldsets = [{ 
        legend: "Sign in", 
        fields: signInFields 
    }];

    async function handleSignIn() {
        await users.signInWithEmailAndPassword(
            emailRef.current.value, 
            passwordRef.current.value
        );    
    }

    return (
        <Form 
            onSubmit  = {handleSignIn}
            fieldsets = {signInFieldsets}
        />
    );
}