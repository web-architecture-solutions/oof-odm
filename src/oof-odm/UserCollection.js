import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification    
} from "firebase/auth";

import { where } from "firebase/firestore";

import FirebaseCollection from "./FirebaseCollection";
import UserDocument       from "./UserDocument";

import { AuthError } from "./errors";

import ErrorMessage from "./ErrorMessage";

export default class UserCollection extends FirebaseCollection {
    static get FirebaseDocument () {
        return UserDocument;
    }

    doesUsernameExist = async (username) => {
        return await this.includesWithValue("username", username);
    }

    searchByUsername = (username, limit, callback) => {
        return this.subscribeToSearchResultsStartingWith(
            "caseInsensitiveUsername",
            username.toLowerCase(),
            limit,
            callback
        );
    }

    /* #region CRUD Methods */

    createWithEmailAndPassword = async (
        profile, 
        email, 
        password, 
        setServerError = null,
        callback = null
    ) => {
        const usernameExists = await this.doesUsernameExist(profile.username);
        if (usernameExists) {
            const handleServerError 
                = UserCollection.serverErrorHandlerFactory(setServerError);
            handleServerError({ code: "auth/username-already-exists" });
        } else {
            const onSuccess = async ({ user }) => {
                const { username } = profile;
                if (username) {
                    profile.caseInsensitiveUsername = username.toLowerCase();
                }
                await this.set(profile, user.uid);
                await sendEmailVerification(user);
                if (callback) callback();
            };
            createUserWithEmailAndPassword(this.authentication, email, password)
                .then(onSuccess)
                .catch(UserCollection.serverErrorHandlerFactory(setServerError));    
        }
    }

    getByUsername = async (username) => {
        const whereClause = where("username", "==", username);
        const results     = await this.getWhere(whereClause);
        if (results.length > 1) {
            this.firebase.logs.add({ 
                code   : "auth/more-than-one-user-with-username",
                message: "More than one user exists with that username",
                username 
            });
        }
        // TODO: should this return the *oldest* user just in case?
        return results[0];
    }

    /* #endregion CRUD Methods */

    /* #region Sign in/out Methods */

    static serverErrorHandlerFactory(setServerError) {
        return ({ code }) => {
            const _message = "There was a user authentication error";
            const message  = ErrorMessage[code] || _message;
            const error    = new AuthError({ code, message });
            setServerError ? setServerError([error]) : console.error(error);
        }
    }

    signInWithEmailAndPassword = async (
        email, 
        password, 
        setServerError = null,
        callback = null
    ) => {
        signInWithEmailAndPassword(this.authentication, email, password)
            .then(() => callback && callback())
            .catch(UserCollection.serverErrorHandlerFactory(setServerError));
    }

    signOut = (callback = null) => { 
        signOut(this.authentication)
            .then(() => callback && callback())
            .catch(UserCollection.serverErrorHandlerFactory());
    }

    /* #endregion Sign in/out Methods */
}