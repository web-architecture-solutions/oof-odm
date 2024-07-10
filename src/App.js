import { useEffect, useState } from "react";

import firebase from "./firebase.js";

import { View } from "./constants.js";

import Loading from "./components/Loading/Loading.js";

import AuthNav          from "./auth/components/AuthNav/AuthNav.js";
import RegistrationForm from "./auth/components/RegistrationForm/RegistrationForm.js";
import SignInForm       from "./auth/components/SignInForm/SignInForm.js";

import { useCurrentUser } from "./auth/hooks.js";

export default function App() {
    const [view     ,      setView] = useState(View.default);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setView(isLoading ? View.loading : View.default);
    }, [isLoading])

    const users       = firebase.users;
    const currentUser = useCurrentUser({ firebase, setIsLoading });

    console.log("currentUser:", currentUser);

    if (isLoading) return <Loading />;
    switch (view) {
        case View.register:
            return <RegistrationForm users={users} />;
        case View.signIn:
            return <SignInForm users={users} />;
        default:
            return (
                <AuthNav 
                    currentUser      = {currentUser}
                    handleOnSignOut  = {() => users.signOut()}
                    handleOnSignIn   = {() => setView("signIn")}
                    handleOnRegister = {() => setView("register")}
                />
            );
    }
}