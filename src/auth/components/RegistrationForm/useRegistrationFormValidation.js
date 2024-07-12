import { useCallback, useState } from "react";

import { ErrorMessage, PasswordError } from "../../../constants";

export default function useRegistrationFormValidation({ 
    passwordRef,
    confirmPasswordRef
}) {
    const [passwordError, setPasswordError] = useState("");
    
    const validatePassword = useCallback(() => {
        const { value:        password } =        passwordRef.current;
        const { value: confirmPassword } = confirmPasswordRef.current;
        const doPasswordsMatch = password === confirmPassword;
        
        setPasswordError(() => {
            return !doPasswordsMatch
                ? ErrorMessage[PasswordError.doNotMatch]
                : "";
        });
    }, [passwordRef, confirmPasswordRef]);

    return { 
        errors          : passwordError ? [passwordError]: [],
        validatePassword: validatePassword
    };
}