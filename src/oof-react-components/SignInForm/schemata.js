import FieldsetSchemata from "../../schematic-react-forms/FieldsetSchemata";

import { email, password } from "../terms";

import { AutoComplete, FieldType } from "../../schematic-react-forms/constants";

const signInFieldsetSchemata = new FieldsetSchemata({ 
    name  : "credentials",
    legend: "Enter User Credentials",
    fields: [{
        name        : email.lowercase,
        label       : email.uppercase,
        placeholder : email.uppercase,
        type        : FieldType.email,
        autoComplete: AutoComplete.email,
        isRequired  : true,
        pattern     : /^\S+@\S+\.\S+$/
    }, {
        name        : password.lowercase,
        label       : password.uppercase,
        placeholder : password.uppercase,
        type        : FieldType.password,
        autoComplete: AutoComplete.currentPassword,
        isRequired  : true
    }] 
});

export default signInFieldsetSchemata;