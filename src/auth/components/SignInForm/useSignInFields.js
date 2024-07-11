import { AutoComplete, FieldType } from "../../../constants";

import { email, password } from "../../terms";

export default function useSignInFields({ emailRef, passwordRef }) {
    return [{
        name        : email.lowercase,
        label       : email.uppercase,
        placeholder : email.uppercase,
        type        : FieldType.email,
        autoComplete: AutoComplete.email,
        ref         : emailRef
    }, {
        name        : password.lowercase,
        label       : password.uppercase,
        placeholder : password.uppercase,
        type        : FieldType.password,
        autoComplete: AutoComplete.currentPassword,
        ref         : passwordRef
    }];
}