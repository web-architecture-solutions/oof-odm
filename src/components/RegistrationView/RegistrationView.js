import { useEffect, useState } from "react";

const ApplicationErrorMessage = {
    "auth/username-already-exists": "A user with that username already exists",
    "auth/passwords-do-not-match" : "The passwords you entered do not match",
};

const FirebaseErrorMessage = {
    "auth/too-many-requests"   : "Too many failed login attempts. Please reset your password or try again later",
    "auth/weak-password"       : "The password you entered is too weak",
    "auth/wrong-password"      : "Email/password is incorrect",
    "auth/invalid-email"       : "Email/password is incorrect",
    "auth/email-already-exists": "A user with that email already exists",
    "auth/email-already-in-use": "A user with that email already exists",
};

const ErrorMessage = { 
    ...ApplicationErrorMessage, 
    ...FirebaseErrorMessage 
};

export default function RegistrationView({ users }) {
    const [username            , setUsername            ] = useState("");
    const [email               , setEmail               ] = useState("");
    const [password            , setPassword            ] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errorCode           , setErrorCode           ] = useState(null);
    const [errorMessage        , setErrorMessage        ] = useState(null);

    useEffect(() => {
        setErrorCode(null);
    }, [username, email]);

    useEffect(() => {
        const errorMessage = errorCode ? ErrorMessage[errorCode] : "";
        setErrorMessage(errorMessage);
    }, [errorCode]);

    useEffect(() => {
        const errorCode 
            = password !== passwordConfirmation 
                ? "auth/passwords-do-not-match" 
                : null;
        setErrorCode(errorCode);    
    }, [password, passwordConfirmation]);

    // BUG: not firing
    // TODO: move as much of this logic into OOF Core as possible
    function handleCreateUser () {
        const callback = (profile) => {
            users._setProfile({
                following: [profile.userId],
                ...profile
            });
        };

        if (username && email && password) {
            const profile = { username };
            users.createWithEmailAndPassword(
                profile, 
                email, 
                password, 
                callback,
                setErrorCode
            );
        }
    }

    return (
        <form>
            <label>
                Username:
                <input 
                    name     = "username"
                    type     = "text"
                    value    = {username}
                    onChange = {({ target }) => setUsername(target.value)}
                />
            </label>
            
            <label>
                Email:
                <input 
                    name     = "email"
                    type     = "email"
                    value    = {email}
                    onChange = {({ target }) => setEmail(target.value)}
                />
            </label>
            
            <label>
                Password:
                <input 
                    name     = "password"
                    type     = "password"
                    value    = {password}
                    onChange = {({ target }) => setPassword(target.value)}
                />
            </label>
            
            <label>
                Confirm Password:
                <input 
                    name     = "passwordConfirmation"
                    type     = "password"
                    value    = {passwordConfirmation}
                    onChange = {({ target }) => setPasswordConfirmation(target.value)}
                />  
            </label>

            <button onClick={handleCreateUser}>
                Register
            </button>

            <span>{errorMessage}</span>
        </form>
    );
}