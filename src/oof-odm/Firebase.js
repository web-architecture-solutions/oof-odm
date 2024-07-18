import { initializeApp } from "firebase/app";

import { 
    doc, 
    getCountFromServer,
    getDoc,
    getFirestore, 
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import UserCollection from "./UserCollection";
import UserDocument   from "./UserDocument";

export default class Firebase {
    constructor(configuration) {
        const application = initializeApp(configuration);
        this.firestore    = getFirestore(application);    
    }

    initializeUsers = (
        _UserCollection     = UserCollection,
        _UserDocument       = UserDocument,
        subcollectionSchema = {}
    ) => {
        this.UserDocument = _UserDocument;
        this.users = new _UserCollection({
            firebase           : this,
            isRecursive        : false,
            collectionPath     : ["users"],
            FirebaseDocument   : _UserDocument,
            collectionName     : "users",
            subcollectionSchema: subcollectionSchema
        });
        return this;
    }   
    
    initializeAuthentication = () => {
        const authentication = getAuth(this.application);    
        this.authentication = authentication
        // TODO: do I need these?
        this.currentUserId  = authentication?.currentUser?.uid || null;
        this.currentUser    = null;
        return this;
    }

    _initializeSubcollections = (
        subcollectionSchema, 
        modelInstance, 
        isRecursive
    ) => {
        Object.entries(subcollectionSchema).forEach(([
            subcollectionName, 
            data
        ]) => {
            const { 
                FirebaseCollection,
                FirebaseDocument,
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
            const collection = new FirebaseCollection({
                firebase   : this,
                isRecursive: isRecursive,
                collectionPath,
                FirebaseDocument,
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

    static _isValidDocumentPath = (documentPath) => {
        return documentPath.length % 2 === 0;
    }

    _getReference = (...documentPath) => {
        if (!Firebase._isValidDocumentPath(documentPath)) {
            throw new TypeError("Invalid document path length.");
        }
        return doc(this.firestore, ...documentPath);
    }

    /* #region Snapshot Methods */

    _getSnapshot = async (...documentPath) => {
        const documentReference = this._getReference(...documentPath);
        return await getDoc(documentReference);
    }

    _snapshotIsEmpty = async (snapshot) => {
        const countSnapshot = await getCountFromServer(snapshot);
        const count         = countSnapshot.data().count;
        return count === 0;
    }

    _getFromSnapshot = (documentFactory, resultSnapshot) => {  
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

    _getUserProfileData = async (userId) => {
        const profileSnapshot = await this._getSnapshot("users", userId);
        return profileSnapshot.data();
    }

    _makeCurrentUser = async (_currentUserData) => {
        const currentUserId   = _currentUserData.uid;
        const profileData     = await this._getUserProfileData(currentUserId);
        // Integrate utility IDs and profile data
        const currentUserData = {
            id    : currentUserId,
            userId: currentUserId,  
            ..._currentUserData,
            ...profileData
        };
        // Build currentUser document
        const currentUser = new this.UserDocument({ 
            collection: this.users,
            data      : currentUserData
        });
        currentUser.currentUser = currentUser;
        return currentUser;
    }
    
    onUserChange = (setCurrentUser, setIsLoading = null) => { 
        const onSuccess = async (currentUserData) => {    
            if (currentUserData) {                  
                if (setIsLoading) setIsLoading(true); 
                const currentUser = await this._makeCurrentUser(currentUserData); 
                setCurrentUser(currentUser);
                if (setIsLoading) setIsLoading(false); 
            } else {
                setCurrentUser(null);
            }
        };
        return onAuthStateChanged(this.authentication, onSuccess);        
    }

    /* #endregion User Methods */
}