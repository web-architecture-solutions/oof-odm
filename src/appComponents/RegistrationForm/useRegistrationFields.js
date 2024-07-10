export default function useRegistrationFields({ 
    usernameRef, 
    emailRef,
    passwordRef,
    confirmPasswordRef
}) {
    return [{
        autoComplete: "username",
        name        : "username",
        label       : "Username",
        placeholder : "Username",
        type        : "text",
        ref         : usernameRef
    }, {
        autoComplete: "email",
        name        : "email",
        label       : "Email",
        placeholder : "Email",
        type        : "email",
        ref         : emailRef
    }, {
        autoComplete: "password",
        name        : "password",
        label       : "Password",
        placeholder : "Password",
        type        : "password",
        ref         : passwordRef
    }, {
        autoComplete: "confirm-password",
        name        : "confirmPassword",
        label       : "Confirm Password",
        placeholder : "Confirm Password",
        type        : "password",
        ref         : confirmPasswordRef
    }];
}