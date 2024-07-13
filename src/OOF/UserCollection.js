import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification    
} from "firebase/auth";

import { where } from "firebase/firestore";

import FirebaseCollection from "./FirebaseCollection";
import UserDocument       from "./UserDocument";

import ErrorMessage from "./ErrorMessage";

function _handleError(errorCode) {
    console.error(`${errorCode}:`, ErrorMessage[errorCode]);
}

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
        handleError = _handleError,
        callback = null
    ) => {
        const usernameExists = await this.doesUsernameExist(profile.username);
        if (usernameExists) {
            handleError("auth/username-already-exists");    
        } else {
            const onSuccess = async ({ user }) => {
                if (profile.username) {
                    profile.caseInsensitiveUsername 
                        = profile.username.toLowerCase();
                }
                await this.set(profile, user.uid);
                await sendEmailVerification(user);
                if (callback) callback();
            };
            createUserWithEmailAndPassword(this.authentication, email, password)
                .then(onSuccess)
                .catch((error) => handleError(error.code));    
        }
    }

    getByUsername = async (username) => {
        const whereClause = where("username", "==", username);
        const results     = await this.getWhere(whereClause);
        if (results.length > 1) {
            console.error("More than one user exists with that username.");
        }
        return results[0];
    }

    /* #endregion CRUD Methods */

    /* #region Sign in/out Methods */

    signInWithEmailAndPassword = async (
        email, 
        password, 
        setError = (error) => console.error(error)
    ) => {
        signInWithEmailAndPassword(this.authentication, email, password)
            .catch(({ code, message }) => {
                console.error(code, message)
                if (setError) setError(code);
            });
    }

    signOut = (callback = null) => { 
        signOut(this.authentication).then(() => callback && callback()); 
    }

    /* #endregion Sign in/out Methods */
}