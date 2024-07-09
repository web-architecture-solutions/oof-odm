import { useRef } from "react";

import Field from "../../formComponents/Field/Field";

import Button from "../../formComponents/Button/Button";

export default function SignInView({ users, setError }) {
    const emailRef    = useRef();
    const passwordRef = useRef();

    async function handleSignIn() {
        await users.signInWithEmailAndPassword(
            emailRef.current, 
            passwordRef.current, 
            setError
        );    
    }

    return (
        <form>            
            <Field autoComplete="email" ref={emailRef} />

            <Field autoComplete="current-password" ref={passwordRef} />
            
            <Button onClick={handleSignIn}>
                Sign In
            </Button>
        </form>
    );
}