import { useRef } from "react";

import Form     from "../../../form-components/Form/Form";
import Fieldset from "../../../form-components/Fieldset/Fieldset";

import useSignInFields from "./useSignInFields";

import styles from "./SignInForm.module.css";

export default function SignInForm({ users }) {
    const emailRef    = useRef();
    const passwordRef = useRef();

    async function handleSignIn() {
        await users.signInWithEmailAndPassword(
            emailRef.current.value, 
            passwordRef.current.value, 
            (error) => console.error(error)
        );    
    }

    const signInFields = useSignInFields({ emailRef, passwordRef }); 
    
    return (
        <Form onSubmit={handleSignIn}>
            <Fieldset 
                legend = "Sign in"
                fields = {signInFields}
            />
        </Form>
    );
}