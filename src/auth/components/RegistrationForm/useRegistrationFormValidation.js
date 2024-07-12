import { useCallback, useState } from "react";

import { PasswordError } from "../../errors";

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
                ? new PasswordError("Passwords do not match")
                : null;
        });
    }, [passwordRef, confirmPasswordRef]);

    return { 
        formErrors      : passwordError ? [passwordError]: [],
        validatePassword: validatePassword
    };
}