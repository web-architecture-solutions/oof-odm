import { useEffect, useState } from "react";

import firebase from "./firebase.js";

import { View } from "./constants.js";

import Loading          from "./AppComponents/Loading/Loading";
import AuthNav          from "./AppComponents/AuthNav/AuthNav";
import RegistrationForm from "./AppComponents/RegistrationForm/RegistrationForm";
import SignInForm       from "./AppComponents/SignInForm/SignInForm";

import { useCurrentUser } from "./hooks.js";

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