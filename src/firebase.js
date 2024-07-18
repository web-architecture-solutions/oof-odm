import Firebase from "./oof/odm/Firebase";

const configuration = {
    apiKey           : "AIzaSyBwWR9xDtEYBA2s0cpckaRaNHvbKvlNl4Q",
    authDomain       : "oof-odm.firebaseapp.com",
    projectId        : "oof-odm",
    storageBucket    : "oof-odm.appspot.com",
    messagingSenderId: "396796321822",
    appId            : "1:396796321822:web:c5290cbd2bd277da060e0f"
};

const firebase = new Firebase(configuration)
    .initializeUsers()
    .initializeAuthentication();

export default firebase;