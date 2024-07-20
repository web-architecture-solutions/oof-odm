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
        setError,
        callback = null
    ) => {
        console.log(profile)
        const usernameExists = await this.doesUsernameExist(profile.username);
        console.log(usernameExists)
        if (usernameExists && setError) {
            const code = "auth/username-already-exists";
            setError(
                new AuthError({
                    code,
                    message: ErrorMessage[code]
                })
            );
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
                .catch(({ code }) => {
                    console.error(code);
                    if (setError) {
                        setError(
                            new AuthError({
                                code,
                                message: ErrorMessage[code]
                            })
                        );
                    }
                });    
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
        setError
    ) => {
        signInWithEmailAndPassword(this.authentication, email, password)
            .catch(({ code }) => {
                console.error(code);
                if (setError) {
                    setError(
                        new AuthError({
                            code,
                            message: ErrorMessage[code]
                        })
                    );
                }
            });
    }

    signOut = (callback = null) => { 
        signOut(this.authentication).then(() => {
            if (callback) callback();
        }); 
    }

    /* #endregion Sign in/out Methods */
}