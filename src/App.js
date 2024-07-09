import { useEffect, useState } from "react";

import configuration from "./configuration.js";

import Firebase from "./persistence/Firebase";

import LoadingView      from "./appComponents/LoadingView/LoadingView";
import DefaultView      from "./appComponents/DefaultView/DefaultView";
import RegistrationView from "./appComponents/RegistrationView/RegistrationView";
import SignInView       from "./appComponents/SignInView/SignInView";

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
    const [view       ,        setView] = useState(View.default);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading  ,   setIsLoading] = useState(false);

    useEffect(() => {
        setView(isLoading ? View.loading : View.default);
    }, [isLoading])

    console.log("currentUser:", currentUser);

    useEffect(() => {
        const unsubscribeFromCurrentUser = firebase.onUserChange(
            setCurrentUser,
            setIsLoading
        );
        return () => unsubscribeFromCurrentUser(); 
    }, []);

    switch (view) {
        case View.loading:
            return (
                <LoadingView />
            );
        case View.register:
            return (
                <RegistrationView users={firebase.users} />
            );
        case View.signIn:
            return (
                <SignInView 
                    users   = {firebase.users}
                    setView = {setView}
                />
            );
        default:
            return (
                <DefaultView 
                    users          = {firebase.users}
                    currentUser    = {currentUser}
                    setCurrentUser = {setCurrentUser}
                    setView        = {setView}
                />
            );
    }
}