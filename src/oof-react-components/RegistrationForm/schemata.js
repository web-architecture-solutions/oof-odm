import FieldsetSchemata from "../../schematic-react-forms/FieldsetSchemata";
import FieldSchemata    from "../../schematic-react-forms/FieldSchemata";

import { AutoComplete, FieldType } from "../../schematic-react-forms/constants";

import { username, email, password } from "../terms";   

const usernameName         = username.lowercase;
const usernameLabel        = username.uppercase;
const emailName            = email.lowercase;
const emailLabel           = email.uppercase;
const passwordName         = password.lowercase;
const passwordLabel        = password.uppercase;
const confirmPasswordName  = "confirmPassword";
const confirmPasswordLabel = "Confirm Password";

const registrationFieldsetSchemata = new FieldsetSchemata({
    name  : "credentials",
    legend: "Enter User Credentials",
    fields: new FieldSchemata({
        autoComplete: AutoComplete.username,
        name        : usernameName,
        label       : usernameLabel,
        placeholder : usernameLabel,
        type        : FieldType.text,
        isRequired  : true
    }, {
        autoComplete: AutoComplete.email,
        name        : emailName,
        label       : emailLabel,
        placeholder : emailLabel,
        type        : FieldType.email,
        isRequired  : true
    }, {
        autoComplete: AutoComplete.newPassword,
        name        : passwordName,
        label       : passwordLabel,
        placeholder : passwordLabel,
        type        : FieldType.password,
        isRequired  : true
    }, {
        autoComplete: AutoComplete.newPassword,
        name        : confirmPasswordName,
        label       : confirmPasswordLabel,
        placeholder : confirmPasswordLabel,
        type        : FieldType.password,
        isRequired  : true
    })
});

export default registrationFieldsetSchemata;