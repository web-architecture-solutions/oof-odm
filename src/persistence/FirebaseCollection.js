import { 
    and,
    collection,
    collectionGroup,
    deleteDoc,
    doc,
    getDocs,
    limit,
    onSnapshot,
    query, 
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";

export default class FirebaseCollection {
    constructor ({ 
        firebase, 
        isRecursive, 
        collectionPath,
        FirebaseDocument,
        collectionName,
        subcollectionSchema
    }) {
        const firestore = firebase.firestore;

        this.firebase                 = firebase;
        this.isRecursive              = isRecursive;
        this.path                     = collectionPath;
        this.FirebaseDocument         = FirebaseDocument;  
        this.collectionName           = collectionName;
        this.subcollectionSchema      = subcollectionSchema || null;

        if (isRecursive && collectionPath.length > 1) {
            throw new TypeError("Collection path is overspecified.");
        } else if (isRecursive) {
            this.reference = collectionGroup(firestore, ...collectionPath);
        } else if (collectionPath.length % 2 === 0) {
            throw new TypeError("Invalid collection path length.");
        } else {
            this.reference = collection(firestore, ...collectionPath);
        }

        if (subcollectionSchema) {
            firebase._initializeSubcollections(
                this.subcollectionSchema,
                this,
                true
            );
        }
    }

    /* #region Getters and Setters */

    /* #region Getters */

    get isSubcollection () {
        return this.path.length > 2;
    }

    get authentication () {
        return this.firebase.authentication;
    }

    get currentUser () {
        return this.firebase.currentUser;
    }

    get currentUserId () {
        return this.firebase.currentUser?.userId || null;
    }

    get UserDocument () {
        return this.firebase.UserDocument;
    }

    get users () {
        return this.firebase.users;
    }

    /* #endregion Getters */

    /* #region Setters */

    set authentication (authentication) {
        this.firebase.authentication = authentication;
    }

    set currentUser (_currentUser) {
        this.firebase.currentUser = _currentUser;
    }

    set currentUserId (_currentUserId) {
        this.firebase.currentUser.userId = _currentUserId
    }

    set UserDocument (_UserDocument) {
        this.firebase.UserDocument = _UserDocument;
    }

    set users (_users) {
        this.firebase.users = _users;
    }

    /* #endregion Setters */

    /* #endregion Getters and Setters */

    /* #region Factory Methods */

    _abstractDocumentFactory = (FirebaseDocument) => {
        return (documentSnapshot) => {
            return new FirebaseDocument({
                collection: this,
                data      : documentSnapshot.data()
            });
        }
    }

    _documentFactory = (documentSnapshot) => {
        const __documentFactory 
            = this._abstractDocumentFactory(this.FirebaseDocument);
        return __documentFactory(documentSnapshot);
    }

    /* #endregion Factory Methods */

    /* #region Existence Methods */

    includes = async (id) => {
        return await this.includesWithValue("id", id);      
    }

    includesWithValue = async (field, value) => {
        const whereClause   = where(field, "==", value);
        const querySnapshot = query(this.reference, whereClause);
        return !await this.firebase._snapshotIsEmpty(querySnapshot);
    }

    /* #endregion Existence Methods  */

    /* #region Subscription Methods */

    _onSubscribeSuccessFactory = (callback) => {
        return (resultSnapshot) => {
            const documents = this.firebase._getFromSnapshot(
                this._documentFactory,
                resultSnapshot
            );
            callback(documents);
        };
    }   

    subscribeWhere = (whereClause, _limit, callback) => {
        const onSuccess     = this._onSubscribeSuccessFactory(callback);
        const limitClause   = limit(_limit);
        const querySnapshot = query(this.reference, whereClause, limitClause);
        return onSnapshot(querySnapshot, onSuccess);
    }

    subscribe = (_limit, callback) => {
        const onSuccess     = this._onSubscribeSuccessFactory(callback);
        const limitClause   = limit(_limit);
        const querySnapshot = query(this.reference, limitClause);
        return onSnapshot(querySnapshot, onSuccess);
    }

    subscribeByUserId = (userId, limit, callback) => {
        const whereClause = where("userId", "==", userId);
        return this.subscribeWhere(whereClause, limit, callback);
    }

    subscribeByCurrentUser = (limit, callback) => {
        return this.subscribeByUserId(this.currentUserId, limit, callback);
    } 

    subscribeToSearchResultsStartingWith = (
        field, 
        startsWith, 
        limit, 
        callback
    ) => {
        const lessThan = startsWith.replace(/.$/, (c) => { 
            return String.fromCharCode(c.charCodeAt(0) + 1); 
        });
        const whereStartsWith = where(field, '>=', startsWith);
        const whereLessThan   = where(field, '<' , lessThan);
        const whereClause     = and(whereStartsWith, whereLessThan);
        return this.subscribeWhere(whereClause, limit, callback);
    }

    /* #endregion Subscription Methods */

    /* #region CRUD Methods */

    /* #region Create Methods */

    _set = async (data, documentReference) => {
        const _documentData = { 
            ...data, 
            id       : documentReference.id,
            path     : [...this.path, documentReference.id],
            timestamp: serverTimestamp()
        };
        await setDoc(documentReference, _documentData);       
        return _documentData;
    }

    add = async (data) => {
        if (this.isRecursive) {
            throw new TypeError("Cannot add to a recursive collection");
        } else {
            const documentReference = doc(this.reference);
            return await this._set(data, documentReference);
        }
    }

    set = async (data, id) => {
        if (this.isRecursive) {
            throw new TypeError("Cannot add to a recursive collection");
        } else {
            const documentReference 
                = this.firebase._getReference(...this.path, id);
            return await this._set(data, documentReference);
        }
    }

    /* #endregion Create Methods */

    /* #region Read Methods */ 

    getAll = async () => {
        const resultSnapshot = await getDocs(this.reference);
        return this.firebase._getFromSnapshot(
            this._documentFactory, 
            resultSnapshot
        );
    }

    get = async (id) => {
        // return array of documents
        if (this.isRecursive) { 
            return await this.getByValue("id", id); 
        }  
        // returns a single document
        const documentSnapshot 
            = await this.firebase._getSnapshot(...this.path, id);
        if (documentSnapshot.exists()) {
            return this._documentFactory(documentSnapshot);
        };
    }

    getWhere = async (whereClause) => {
        const querySnapshot  = query(this.reference, whereClause);
        const resultSnapshot = await getDocs(querySnapshot);
        return this.firebase._getFromSnapshot(
            this._documentFactory, 
            resultSnapshot
        );
    }

    getByValue = async (field, value) => {
        const whereClause = where(field, "==", value);
        return await this.getWhere(whereClause);
    }

    getByUserId = async (userId) => {
        const whereClause = where("userId", "==", userId);
        return await this.getWhere(whereClause);
    }

    /* #endregion Read Methods */

    update = async (data, id) => {
        const documentReference
            = await this.firebase._getReference(...this.path, id);   
        await updateDoc(documentReference, data);
    }

    /* #region Delete Methods */
    
    delete = async (id) => {
        const documentReference = this.firebase._getReference(...this.path, id);
        await deleteDoc(documentReference);
        return;
    }

    deleteAllWhere = async (whereClause)  =>{
        const deleteDocument = async (document) => await document.delete();
        const documents      = await this.getWhere(whereClause);
        return await Promise.all(documents.map(deleteDocument));
    }

    deleteAllByUserId = async (userId) => {  
        const whereClause = where("userId", "==", userId);
        return await this.deleteAllWhere(whereClause);
    }

    /* #endregion Delete Methods */

    /* #endregion CRUD Methods */
}