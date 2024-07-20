import FirebaseDocument from "./FirebaseDocument";

export default class UserDocument extends FirebaseDocument {
    signOut = (callback = null) => this.collection.signOut(callback);
}