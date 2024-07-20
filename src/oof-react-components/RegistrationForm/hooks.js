import { useCallback, useState } from "react";

import { useValidation } from "../../schematic-react-forms/hooks";

import { RegistrationError } from "../errors";

import useFieldErrors from "../../schematic-react-forms/Form/hooks";

export function useRegistrationFormValidation({ 
    password, 
    confirmPassword 
}) {
    const [serverErrors, setServerErrors] = useState([]);
    const [fieldsetErrors, setFieldsetErrors] = useState({});

    const fieldErrors = useFieldErrors(fieldsetErrors);

    const arePasswordsFalsy       = !password && !confirmPassword;
    const doPasswordsMatch        =  password === confirmPassword;
    const isPasswordMismatchError = !arePasswordsFalsy && !doPasswordsMatch;

    const _validatePassword = useCallback(() => {
        return [{
            condition: isPasswordMismatchError,
            error    : RegistrationError,
            code     : "oof-react-components/passwords-do-not-match",
            message  : "Passwords do not match"
        }];
    }, [isPasswordMismatchError]);

    const [passwordErrors, validatePassword] = useValidation(_validatePassword);

    return { 
        formErrors: [...passwordErrors, ...serverErrors], 
        validatePassword, 
        setServerErrors,
        fieldErrors,
        setFieldsetErrors
    };
}
