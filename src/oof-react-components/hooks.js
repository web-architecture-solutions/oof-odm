import { useEffect, useState } from "react";

import { OOFReactError } from "./errors";

import { AND } from "../logic";

export function useCurrentUser({ firebase, setIsLoading }) {
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

function handleUnhandledError({ 
    setServerErrors, 
    error, 
    Logs   = null,
    errors = null
}) {
    setServerErrors([error]);
    console.error(error, error.note);
    if (Logs && errors) {
        Logs.add({
            code   : error.code,
            message: error.message,
            note   : error.note,
            errors : errors.map(({ code, message }) => ({ code, message }))
        });
    }
}

export function useOnSubmit(callback, {
    isError,
    setServerErrors,
    fields,
    Logs   = null,
    errors = null
}) {
    return () => {
        if (isError) {            
            const error = new OOFReactError({
                code   : "auth/front-end-validation-error",
                message: "There are unhandled errors",
                note   : "Check Form component implementation"
            });
            handleUnhandledError({
                setServerErrors,
                error,
                errors,
                Logs
            });
        } else if (AND(...fields)) {
            callback();
        } else {
            const error = new OOFReactError({
                code   : "auth/front-end-validation-error",
                message: "There are unhandled errors",
                note   : "Check useError hook implementation"
            });
            handleUnhandledError({
                setServerErrors,
                error,
                errors,
                Logs
            });
        }
    }
};