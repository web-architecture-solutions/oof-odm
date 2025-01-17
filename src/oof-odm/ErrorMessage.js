const OOFErrorMessage = {
    "auth/username-already-exists": "A user with that username already exists"
};

const FirebaseErrorMessage = {
    "auth/too-many-requests"   : "Too many failed login attempts. Please reset your password or try again later",
    "auth/weak-password"       : "The password you entered is too weak",
    "auth/wrong-password"      : "Email or password is incorrect",
    "auth/invalid-email"       : "Email address is formatted incorrectly",
    "auth/invalid-credential"  : "Email or password is incorrect",
    "auth/email-already-exists": "A user with that email already exists",
    "auth/email-already-in-use": "A user with that email already exists",
};

const ErrorMessage = { ...OOFErrorMessage, ...FirebaseErrorMessage };

export default ErrorMessage;