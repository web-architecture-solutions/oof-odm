import { useEffect, useState } from "react";

import configuration from "./configuration.js";

import Firebase from "./OOF/Firebase";

import LoadingView      from "./AppComponents/LoadingView/LoadingView";
import DefaultView      from "./AppComponents/DefaultView/DefaultView";
import RegistrationView from "./AppComponents/RegistrationView/RegistrationView";
import SignInView       from "./AppComponents/SignInView/SignInView";

const View = {
    default : "default",
    loading : "loading",
    register: "register",
    signIn  : "signIn"
};

const firebase = new Firebase(configuration)
    .initializeUsers()
    .initializeAuthentication();

function useCurrentUser({ firebase, setIsLoading }) {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const unsubscribeFromCurrentUser = firebase.onUserChange(
            setCurrentUser,
            setIsLoading
        );
        return () => unsubscribeFromCurrentUser(); 
    }, [firebase, setIsLoading]);
    return currentUser;
}

export default function App() {
    const [view     ,      setView] = useState(View.default);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setView(isLoading ? View.loading : View.default);
    }, [isLoading])

    const currentUser = useCurrentUser({ firebase, setIsLoading });

    console.log("currentUser:", currentUser);

    

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
                    users       = {firebase.users}
                    currentUser = {currentUser}
                    setView     = {setView}
                />
            );
    }
}