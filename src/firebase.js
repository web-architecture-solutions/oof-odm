import configuration from "./configuration.js";

import Firebase from "./oof/Firebase";

const firebase = new Firebase(configuration)
    .initializeUsers()
    .initializeAuthentication();

export default firebase;