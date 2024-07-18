import FieldsetSchemata from "../../../form/FieldsetSchemata";

import { email, password } from "../terms";

import { AutoComplete, FieldType } from "../../../form/constants";

const signInFieldsetSchemata = new FieldsetSchemata({ 
    name  : "credentials",
    legend: "Enter User Credentials",
    fields: [{
        name        : email.lowercase,
        label       : email.uppercase,
        placeholder : email.uppercase,
        type        : FieldType.email,
        autoComplete: AutoComplete.email,
        isRequired  : true
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