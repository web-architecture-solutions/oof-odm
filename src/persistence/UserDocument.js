import DatabaseDocument from "./DatabaseDocument";

export default class UserDocument extends DatabaseDocument {
    // TODO: Does it make sense to have this on the document itself? 
    signOut = (callback) => {
        this.collection.signOut(callback);
    }
}