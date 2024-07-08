import { initializeApp } from "firebase/app";

import { 
    doc, 
    getCountFromServer,
    getDoc,
    getFirestore, 
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import FirebaseCollection from "./FirebaseCollection";
import FirebaseDocument   from "./FirebaseDocument";

export default class Firebase {
    constructor(configuration) {
        const application = initializeApp(configuration);
        this.firestore    = getFirestore(application);    
    }
    
    initializeAuthentication(
        UserCollection      = null,
        UserDocument        = null,
        subcollectionSchema = {}
    ) {
        UserCollection = UserCollection ?? FirebaseCollection;
        UserDocument   = UserDocument   ?? FirebaseDocument;
        
        const authentication = getAuth(this.application);    
        
        this.authentication = authentication
        this.currentUserId  = authentication?.currentUser?.uid || null;
        this.currentUser    = null;
        this.users          = new UserCollection({
            firebase           : this,
            isRecursive        : false,
            collectionPath     : ["users"],
            DatabaseDocument   : this.UserDocument,
            collectionName     : "users",
            subcollectionSchema: subcollectionSchema
        });

        return this;
    }

    initializeSubcollections = (
        subcollectionSchema, 
        modelInstance, 
        isRecursive
    ) => {
        Object.entries(subcollectionSchema).forEach(([
            subcollectionName, 
            data
        ]) => {
            const { 
                DatabaseCollection,
                DatabaseDocument,
                collectionName,
                parentCollectionName,
                subcollectionSchema,
                denormalizationMap,
                parentDenormalizationMap
            } = data;
            const collectionPath = isRecursive ? [
                subcollectionName            
            ] : [
                modelInstance.constructor.rootCollectionName,
                modelInstance.id, 
                subcollectionName
            ]; 
            const collection = new DatabaseCollection({
                firebase   : this,
                isRecursive: isRecursive,
                collectionPath,
                DatabaseDocument,
                collectionName,
                parentCollectionName,
                subcollectionSchema,
                denormalizationMap,
                parentDenormalizationMap
            });
            const getter = { get: () => collection };
            Object.defineProperty(modelInstance, subcollectionName, getter);  
        });
    }

    getReference = (...documentPath) => {
        if (documentPath.length % 2 !== 0) {
            throw new TypeError("Invalid document path length.");
        }
        return doc(this.firestore, ...documentPath);
    }

    /* #region Snapshot Methods */

    getSnapshot = async (...documentPath) => {
        const documentReference = this.getReference(...documentPath);
        return await getDoc(documentReference);
    }

    snapshotIsEmpty = async (snapshot) => {
        const countSnapshot = await getCountFromServer(snapshot);
        const count         = countSnapshot.data().count;
        return count === 0;
    }

    getFromSnapshot = (documentFactory, resultSnapshot) => {  
        const documents = [];
        const buildDocument = async (documentSnapshot) => {
            const _document = documentFactory(documentSnapshot);
            documents.push(_document);
        }
        resultSnapshot.forEach(buildDocument);
        return documents;
    }

    /* #endregion Snapshot Methods */

    /* #region User Methods */

    getUserProfileData = async (userId) => {
        const profileSnapshot = await this.getSnapshot("users", userId);
        return profileSnapshot.data();
    }

    setCurrentUser = async (_currentUserData) => {
        const currentUserId   = _currentUserData.uid;
        const profileData     = await this.getUserProfileData(currentUserId);
        const currentUserData = {
            id    : currentUserId,
            userId: currentUserId,  
            ..._currentUserData,
            ...profileData
        };
        const currentUser = new this.UserDocument({ 
            collection: this.users,
            data      : currentUserData
        });
        currentUser.currentUser = currentUser;
        this.currentUser        = currentUser;
    }
    
    onUserChange = (setCurrentUser, setIsLoading) => { 
        const onSuccess = async (currentUserData) => {    
            setIsLoading(); 
            if (currentUserData) {                  
                await this.setCurrentUser(currentUserData); 
                setCurrentUser(this.currentUser);
            }
        };
        return onAuthStateChanged(this.authentication, onSuccess);        
    }

    /* #endregion User Methods */
}