import { useEffect, useState } from "react";

import configuration from "./configuration.js";

import Firebase from "./OOF/Firebase";

import Loading          from "./AppComponents/Loading/Loading";
import AuthNav          from "./AppComponents/AuthNav/AuthNav";
import RegistrationForm from "./AppComponents/RegistrationForm/RegistrationForm";
import SignInForm       from "./AppComponents/SignInForm/SignInForm";

import { useCurrentUser } from "./hooks.js";

const View = {
    default : "default",
    loading : "loading",
    register: "register",
    signIn  : "signIn"
};

const firebase = new Firebase(configuration)
    .initializeUsers()
    .initializeAuthentication();

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
            return (
                <RegistrationForm users={users} />
            );
        case View.signIn:
            return (
                <SignInForm users={users} />
            );
        default:
            return (
                <AuthNav 
                    users       = {users}
                    currentUser = {currentUser}
                    setView     = {setView}
                />
            );
    }
}