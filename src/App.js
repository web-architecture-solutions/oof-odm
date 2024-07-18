import { useEffect, useState } from "react";

import { useCurrentUser } from "./oof-auth-components/hooks";

import AuthNav          from "./oof-auth-components/AuthNav";
import RegistrationForm from "./oof-auth-components/RegistrationForm";
import SignInForm       from "./oof-auth-components/SignInForm";

import firebase from "./firebase.js";

import Loading from "./components/Loading/Loading.js";

import { View } from "./constants.js";

export default function App() {
    const [view     ,      setView] = useState(View.default);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setView(isLoading ? View.loading : View.default);
    }, [isLoading])

    const Users       = firebase.users;
    const currentUser = useCurrentUser({ firebase, setIsLoading });

    console.log("currentUser:", currentUser);

    if (isLoading) return <Loading />;
    switch (view) {
        case View.register:
            return <RegistrationForm Users={Users} />;
        case View.signIn:
            return <SignInForm Users={Users} />;
        default:
            return (
                <AuthNav 
                    currentUser      = {currentUser}
                    handleOnSignOut  = {() => Users.signOut()}
                    handleOnSignIn   = {() => setView("signIn")}
                    handleOnRegister = {() => setView("register")}
                />
            );
    }
}