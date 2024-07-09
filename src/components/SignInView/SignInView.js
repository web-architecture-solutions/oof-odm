import { useState } from "react";

export default function SignInView({ users, setError }) {
    const [email   , setEmail   ] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignIn() {
        await users.signInWithEmailAndPassword(
            email, 
            password, 
            setError
        );    
    }

    return (
        <form>            
            <label>
                Email:
                <input 
                    autoComplete = "email"
                    name         = "email"
                    type         = "email"
                    value        = {email}
                    onChange     = {({ target }) => setEmail(target.value)}
                />
            </label>
            
            <label>
                Password:
                <input 
                    autoComplete = "current-password"
                    name         = "password"
                    type         = "password"
                    value        = {password}
                    onChange     = {({ target }) => setPassword(target.value)}
                />
            </label>
            
            <button onClick={handleSignIn}>
                Sign In
            </button>
        </form>
    );
}