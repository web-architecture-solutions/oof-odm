import { useRef } from "react";

import Form     from "../../formComponents/Form/Form";
import Fieldset from "../../formComponents/Fieldset/Fieldset";

export default function SignInView({ users, setError }) {
    const emailRef    = useRef();
    const passwordRef = useRef();

    async function handleSignIn() {
        await users.signInWithEmailAndPassword(
            emailRef.current.value, 
            passwordRef.current.value, 
            setError
        );    
    }

    const fields = [{
        name        : "email",
        label       : "Email",
        type        : "email",
        placeholder : "Email",
        autoComplete: "email",
        ref         : emailRef
    }, {
        name        : "password",
        label       : "Password",
        type        : "password",
        placeholder : "password",
        autoComplete: "current-password",
        ref         : passwordRef
    }]; 
    
    return (
        <Form onSubmit={handleSignIn}>
            <Fieldset 
                legend = "Sign in"
                fields = {fields}
            />
        </Form>
    );
}