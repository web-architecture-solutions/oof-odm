import { useEffect, useState } from "react";

import { ErrorMessage } from "../../../constants";

export default function useRegistrationFormValidation({ 
    usernameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef
}) {
    const [errorCode   , setErrorCode   ] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const errorMessage = errorCode ? ErrorMessage[errorCode] : "";
        setErrorMessage(errorMessage);
    }, [errorCode]);

    useEffect(() => {
        setErrorCode(null);
    }, [usernameRef, emailRef]);

    useEffect(() => {
        const errorCode 
            = passwordRef.current.value !== confirmPasswordRef.current.value 
                ? "auth/passwords-do-not-match" 
                : null;
        setErrorCode(errorCode);    
    }, [passwordRef, confirmPasswordRef]);

    return { errorCode, setErrorCode, errorMessage };
}