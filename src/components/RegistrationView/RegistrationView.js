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

function useRegistration(users) {
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

    function handleCreateUser () {
        if (username && email && password) {
            const profile = { username };
            users.createWithEmailAndPassword(
                profile, 
                email, 
                password, 
                null,
                setErrorCode
            );
        }
    }

    return { 
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirmation,
        setPasswordConfirmation,
        errorMessage,
        handleCreateUser
    };
}

export default function RegistrationView({ users }) {
    const { 
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirmation,
        setPasswordConfirmation,
        errorMessage,
        handleCreateUser
    } = useRegistration(users);

    return (
        <form>
            <label>
                Username:
                <input 
                    autoComplete = "username"
                    name         = "username"
                    type         = "text"
                    value        = {username}
                    onChange     = {({ target }) => setUsername(target.value)}
                />
            </label>
            
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
                    autoComplete = "password"
                    name         = "password"
                    type         = "password"
                    value        = {password}
                    onChange     = {({ target }) => setPassword(target.value)}
                />
            </label>
            
            <label>
                Confirm Password:
                <input 
                    autoComplete = "confirm-password"
                    name         = "passwordConfirmation"
                    type         = "password"
                    value        = {passwordConfirmation}
                    onChange     = {({ target }) => setPasswordConfirmation(target.value)}
                />  
            </label>

            <button onClick={handleCreateUser}>
                Register
            </button>

            <span>{errorMessage}</span>
        </form>
    );
}