import { useRef } from "react";

import signInFieldsetSchemata from "./schemata";

import { useFormData } from "../../schematic-react-forms/hooks";

import { useErrors } from "../../schematic-react-forms/hooks";

import { OOFReactError } from "../errors";

import Form from "../../schematic-react-forms/Form";

export default function SignInForm({ Logs, Users }) {
    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(signInFieldsetSchemata);

    const { email, password } = formData.credentials;

    const { 
        isError,
        errors,
        formErrors,
        setFieldErrors, 
        setServerErrors 
    } = useErrors([]);

    const emailRef    = useRef();
    const passwordRef = useRef();

    signInFieldsetSchemata.initializeProps([{
        email   : { ref:    emailRef },
        password: { ref: passwordRef }
    }]);

    async function handleSignIn() {
        if (isError) {            
            setServerErrors([new OOFReactError({
                code   : "auth/front-end-validation-error",
                message: "There are unhandled errors",
            })]);
            console.error("There are unhandled errors. Check Form component implementation");
            Logs.add({
                code   : "auth/front-end-validation-error",
                message: "There are unhandled errors",
                note   : "Check Form component implementation",
                errors : errors.map(({ code, message }) => {
                    return { code, message };
                })
            });
        } else if (email && password) {
            await Users.signInWithEmailAndPassword(
                email, 
                password,
                setServerErrors
            );
        } else {
            setServerErrors([new OOFReactError({
                code   : "auth/front-end-validation-error",
                message: "There are unhandled errors",
            })]);
            console.error("There are unhandled errors. Check useErrors hook implementation");
            Logs.add({
                code   : "auth/front-end-validation-error",
                message: "There are unhandled errors",
                note   : "Check useError hook implementation",
                errors : errors.map(({ code, message }) => {
                    return { code, message };
                })
            });
        }
    }

    return (
        <Form 
            isError          = {isError}
            errors           = {formErrors}
            onSubmit         = {handleSignIn}
            onChange         = {handleOnFormChange}
            fieldsetSchemata = {signInFieldsetSchemata}
            setFieldErrors   = {setFieldErrors}
            setServerErrors  = {setServerErrors}
        />
    );
}