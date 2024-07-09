import Timestamp from "./Timestamp";

export default class FirebaseDocument {
    constructor ({ collection, data: _data }) {
        const data = { 
            ..._data, 
            collectionPath: collection.path, // TODO: document why we need this
            timestamp     : new Timestamp(_data.timestamp)
        };

        this.collection = collection;
        this.data       = data;

        // TODO: document this step
        Object
            .entries(data)
            .forEach(([key, value]) => this[key] = value);  

        // TODO: document this process
        if (this.constructor.documentSubcollectionSchema) {
            collection.firebase.initializeSubcollections(
                this.constructor.documentSubcollectionSchema,
                this,
                false
            );
        }
    }

    /* #region Getters and Setters */

    /* #region Getters */

    get firebase () {
        return this.collection.firebase;
    }
    
    get currentUser () {
        return this.collection.currentUser;
    }

    get currentUserId () {
        return this.currentUser.userid;
    }

    /* #endregion Getters */

    /* #region Setters */

    set firebase (_firebase) {
        this.collection.firebase = _firebase;
    }

    set currentUser (_currentUser) {
        this.collection.currentUser = _currentUser;
    }

    set currentUserId (_currentUserId) {
        this.collection.currentUser.userId = _currentUserId;
    }

    /* #endregion Setters */

    /* #endregion Getters */

    exists = async () => {
        return await this.collection.includes(this.id);
    }

    update = async (data) => {
        return await this.collection.update(data, this.id);
    }

    delete = async () => {
        return await this.collection.delete(this.id);
    }
}