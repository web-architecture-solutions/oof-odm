import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification    
} from "firebase/auth";

import { where } from "firebase/firestore";

import FirebaseCollection from "./FirebaseCollection";
import UserDocument       from "./UserDocument";

export default class UserCollection extends FirebaseCollection {
    static get DatabaseDocument () {
        return UserDocument;
    }

    existsWithUsername = async (username) => {
        return await this.firebase.includesWithValue(
            this.collectionName, 
            "username", 
            username
        );
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
        callback, 
        setError
    ) => {
        const usernameExists = await this.doesUsernameExist(profile.username);
        if (usernameExists) {
            setError("auth/username-already-exists");    
        } else {
            const onSuccess = async ({ user: _user }) => {
                const userId = _user.userId;
                if (profile.username) {
                    profile.caseInsensitiveUsername 
                        = profile.username.toLowerCase();
                }
                const user = { ...profile };
                await this.update(user, userId);
                await sendEmailVerification(_user);
                callback();
            };
            createUserWithEmailAndPassword(this.authentication, email, password)
                .then(onSuccess)
                .catch((error) => setError(error.code));    
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
        callback, 
        setError
    ) => {
        signInWithEmailAndPassword(this.authentication, email, password)
            .then(async ({ user }) => {
                const onSuccess = this.onSignInSuccessFactory(callback);
                return await onSuccess(user);
            })
            .catch((error) => setError(error.code));
    }

    signOut = (callback) => { 
        signOut(this.authentication).then(callback); 
    }

    /* #endregion Sign in/out Methods */
}