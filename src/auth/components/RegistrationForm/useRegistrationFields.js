import { useRef } from "react";

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

export default function useRegistrationFields() {
    return [{
        autoComplete: AutoComplete.username,
        name        : usernameName,
        label       : usernameLabel,
        placeholder : usernameLabel,
        type        : FieldType.text,
        isRequired  : true,
        ref         : useRef()
    }, {
        autoComplete: AutoComplete.email,
        name        : emailName,
        label       : emailLabel,
        placeholder : emailLabel,
        type        : FieldType.email,
        isRequired  : true,
        ref         : useRef()
    }, {
        autoComplete: AutoComplete.newPassword,
        name        : passwordName,
        label       : passwordLabel,
        placeholder : passwordLabel,
        type        : FieldType.password,
        isRequired  : true,
        ref         : useRef()
    }, {
        autoComplete: AutoComplete.newPassword,
        name        : confirmPasswordName,
        label       : confirmPasswordLabel,
        placeholder : confirmPasswordLabel,
        type        : FieldType.password,
        isRequired  : true,
        ref         : useRef()
    }];
}