import { AutoComplete, FieldType } from "../../../constants";

import { username, email, password } from "../../terms";

const usernameName         = username.lowercase;
const usernameLabel        = username.uppercase;
const emailName            = email.lowercase;
const emailLabel           = email.uppercase;
const passwordName         = password.lowercase;
const passwordLabel        = password.uppercase;
const confirmPasswordName  = "confirmPassword";
const confirmPasswordLabel = "Confirm Password";

export default function useRegistrationFields({ 
    usernameRef, 
    emailRef,
    passwordRef,
    confirmPasswordRef,
    validatePassword
}) {
    return [{
        autoComplete: AutoComplete.username,
        name        : usernameName,
        label       : usernameLabel,
        placeholder : usernameLabel,
        type        : FieldType.text,
        ref         : usernameRef
    }, {
        autoComplete: AutoComplete.email,
        name        : emailName,
        label       : emailLabel,
        placeholder : emailLabel,
        type        : FieldType.email,
        ref         : emailRef
    }, {
        autoComplete: AutoComplete.newPassword,
        name        : passwordName,
        label       : passwordLabel,
        placeholder : passwordLabel,
        onChange    : validatePassword,
        type        : FieldType.password,
        ref         : passwordRef
    }, {
        autoComplete: AutoComplete.newPassword,
        name        : confirmPasswordName,
        label       : confirmPasswordLabel,
        placeholder : confirmPasswordLabel,
        onChange    : validatePassword,
        type        : FieldType.password,
        ref         : confirmPasswordRef
    }];
}