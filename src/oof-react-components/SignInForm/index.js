import { useRef } from "react";

import signInFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import Form from "../../schematic-react-forms/Form";

import { useFormSubmission } from "../hooks";

export default function SignInForm({ Logs, Users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(signInFieldsetSchemata);

    const { email, password } = formData.credentials;

    async function handleSignIn() {
        await Users.signInWithEmailAndPassword(
            email, 
            password,
            setServerErrors
        );
    }

    const emailRef    = useRef();
    const passwordRef = useRef();

    const { setServerErrors, formProps } = useFormSubmission({
        fieldsetSchemata: signInFieldsetSchemata,
        fieldsetProps   : [{
            email   : { ref:    emailRef },
            password: { ref: passwordRef }
        }],
        requiredFields: [email, password],
        formErrors    : [],
        onChange      : handleOnFormChange,
        onSubmit      : handleSignIn,
        Logs
    });

    return <Form {...formProps} />;
}