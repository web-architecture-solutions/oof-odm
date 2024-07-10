const ApplicationErrorMessage = {
    "auth/username-already-exists": "A user with that username already exists",
    "auth/passwords-do-not-match" : "The passwords you entered do not match",
};

const FirebaseErrorMessage = {
    "auth/too-many-requests"   : "Too many failed login attempts. Please reset your password or try again later",
    "auth/weak-password"       : "The password you entered is too weak",
    "auth/wrong-password"      : "Email/password is incorrect",
    "auth/invalid-email"       : "Email/password is incorrect",
    "auth/email-already-exists": "A user with that email already exists",
    "auth/email-already-in-use": "A user with that email already exists",
};

export const ErrorMessage = { 
    ...ApplicationErrorMessage, 
    ...FirebaseErrorMessage 
};

export const View = {
    default : "default",
    loading : "loading",
    register: "register",
    signIn  : "signIn"
};