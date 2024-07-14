import Form from "../../../form-components/Form/Form";

import useProfile                    from "./useProfile";
import useRegistrationFields         from "./useRegistrationFields";
import useRegistrationFormValidation from "./useRegistrationFormValidation";

import styles from "./RegistrationForm.module.css";

export default function RegistrationForm({ users }) {
    const _registrationFields = useRegistrationFields();

    const usernameRef = _registrationFields.find(({ name }) => {
        return name === "username";
    })?.ref;
    
    const emailRef = _registrationFields.find(({ name }) => {
        return name === "email";
    })?.ref;

    const passwordRef = _registrationFields.find(({ name }) => {
        return name === "password";
    })?.ref;

    const confirmPasswordRef = _registrationFields.find(({ name }) => {
        return name === "confirmPassword";
    })?.ref;

    const { 
        formErrors, 
        validatePassword 
    } = useRegistrationFormValidation({ 
        passwordRef,
        confirmPasswordRef,
    });

    const registrationFields = _registrationFields.map((field) => {
        if (field.name === "password" || field.name === "confirmPassword") {
            return { ...field, onChange: validatePassword };
        }
        return field;
    });

    const registrationFieldsets = [{
        legend: "Register",
        fields: registrationFields
    }];

    const profile = useProfile({ usernameRef });

    function handleRegistration () {
        if (
            formErrors.length === 0
            && usernameRef.current.value 
            && emailRef.current.value 
            && passwordRef.current.value
        ) {
            users.createWithEmailAndPassword(
                profile, 
                emailRef.current.value, 
                passwordRef.current.value
            );
        }
    }


    return (
        <Form 
            className  = {styles.RegistrationForm}
            onSubmit   = {handleRegistration}
            errors     = {formErrors}
            fieldsets  = {registrationFieldsets}
            onChange={(formData) => console.log(formData)}
        />
    );
}