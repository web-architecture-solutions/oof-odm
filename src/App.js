import { useEffect, useState } from "react";

import configuration from "./configuration.js";

import Firebase from "./persistence/Firebase";

const ApplicationErrorMessage = {
    "auth/username-already-exists": "A user with that username already exists.",
    "auth/passwords-do-not-match" : "The passwords you entered do not match"
};

const FirebaseErrorMessage = {
    "auth/wrong-password"      : "Email/password is incorrect.",
    "auth/invalid-email"       : "Email/password is incorrect.",
    "auth/too-many-requests"   : "Too many requests, please try again later.",
    "auth/email-already-exists": "A user with that email already exists.",
    "auth/email-already-in-use": "A user with that email already exists.",
};

export const ErrorMessage = { 
    ...ApplicationErrorMessage, 
    ...FirebaseErrorMessage 
};

const firebase = new Firebase(configuration).initializeAuthentication();

function LoadingView() {
    return (
        <>Loading...</>
    );
}

function DefaultView({ currentUser, setView }) {
    return currentUser ? (
        <button>Sign out</button>
    ) : (
        <>
            <button onClick={() => setView("signIn")}>
                Sign in
            </button>

            <button onClick={() => setView("register")}>
                Register
            </button>
        </>
    );
}

/*
function RegistrationView() {
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
        const callback = (profile) => {
            //Users.setProfile({
            //    following: [profile.userId],
            //    ...profile
            //});
        };

        if (username && email && password) {
            const profile = { username };
            Users.createWithEmailAndPassword(
                profile, 
                email, 
                password, 
                callback,
                setErrorCode
            );
        }
    }

    return (
        <>
            <button onClick={handleCreateUser}>
                Register
            </button>
        </>
    );
}
    */

const View = {
    default : "default",
    loading : "loading",
    register: "register",
    signIn  : "signIn"
};

export default function App() {
    const [view       ,        setView] = useState(View.loading);
    const [currentUser, setCurrentUser] = useState(null);
    
    const setIsLoading = () => setView("loading");

    useEffect(() => {
        const unsubscribeFromCurrentUser = firebase.onUserChange(
            setCurrentUser,
            setIsLoading
        );
        return () => unsubscribeFromCurrentUser(); 
    }, []);
    
    useEffect(() => {
        setTimeout(() => setView(View.default), 1000);
    }, [currentUser]);

    return (
        <div>Hello World</div>
    );

    /*
    switch (view) {
        case "loading":
            return (
                <LoadingView />
            );
        case "register":
            return (
                <RegistrationView />
            );
        default:
            return (
                <DefaultView 
                    currentUser = {currentUser}
                    setView     = {setView}
                />
            );
    }
    */
}