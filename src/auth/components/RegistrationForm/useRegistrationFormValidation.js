import { useCallback, useState } from "react";

import { ErrorMessage, PasswordError } from "../../../constants";

export default function useRegistrationFormValidation({ 
    passwordRef,
    confirmPasswordRef
}) {
    const [passwordError, setPasswordError] = useState(null);
    
    function validatePassword() {
        const { value:        password } = passwordRef.current;
        const { value: confirmPassword } = confirmPasswordRef.current;
        const errorCode = password !== confirmPassword 
            ? PasswordError.doNotMatch 
            : null;
        const _passwordError = ErrorMessage[errorCode];
        setPasswordError(_passwordError);    
    };

    return { 
        errors          : passwordError ? [passwordError]: [],
        validatePassword: useCallback(validatePassword)
    };
}