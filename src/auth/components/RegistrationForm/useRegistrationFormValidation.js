import useValidation from "../../../form/useValidation";

import { RegistrationError } from "../../errors";

export default function useRegistrationFormValidation({ 
    password, 
    confirmPassword 
}) {
    const  arePasswordsFalsy = !password && !confirmPassword;
    const _doPasswordsMatch  =  password === confirmPassword;
    const  doPasswordsMatch  = _doPasswordsMatch || arePasswordsFalsy;
    const  isPasswordSilly   
            =  password === "silly" || confirmPassword === "silly";

    const [passwordErrors, validatePassword] = useValidation([{
        condition: !doPasswordsMatch,
        error    : RegistrationError,
        code     : "auth/passwords-do-not-match",
        message  : "Passwords do not match"
    }, {
        condition: isPasswordSilly,
        error    : RegistrationError,
        code     : "auth/password-is-silly",
        message  : "Password is too silly"
    }], [doPasswordsMatch, isPasswordSilly]);

    return { formErrors: [...passwordErrors], validatePassword };
}