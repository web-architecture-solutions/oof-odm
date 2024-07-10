export default function useSignInFields({ emailRef, passwordRef }) {
    return [{
        name        : "email",
        label       : "Email",
        type        : "email",
        placeholder : "Email",
        autoComplete: "email",
        ref         : emailRef
    }, {
        name        : "password",
        label       : "Password",
        type        : "password",
        placeholder : "password",
        autoComplete: "current-password",
        ref         : passwordRef
    }];
}