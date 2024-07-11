import { AutoComplete, FieldType } from "../../../constants";

import { email, password } from "../../terms";

export default function useSignInFields({ emailRef, passwordRef }) {
    return [{
        name        : email.lowercase,
        label       : email.uppercase,
        placeholder : email.uppercase,
        type        : FieldType.email,
        autoComplete: AutoComplete.email,
        isRequired  : true,
        ref         : emailRef
    }, {
        name        : password.lowercase,
        label       : password.uppercase,
        placeholder : password.uppercase,
        type        : FieldType.password,
        autoComplete: AutoComplete.currentPassword,
        isRequired  : true,
        ref         : passwordRef
    }];
}