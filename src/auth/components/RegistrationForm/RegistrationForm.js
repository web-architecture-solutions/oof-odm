import Form from "../../../form-components/Form/Form";

import useRegistrationFormSchema     from "./useRegistrationFormSchema";
import useRegistrationFormValidation from "./useRegistrationFormValidation";

import useFormData from "../../../form-components/Form/useFormData";

import styles from "./RegistrationForm.module.css";

export default function RegistrationForm({ users }) {
    const registrationFormSchema = useRegistrationFormSchema();

    const { 
        formData, 
        handleOnFormChange 
    } = useFormData(registrationFormSchema.length);

    const { 
        formErrors, 
        //validatePassword 
    } = useRegistrationFormValidation({ formData });
    
    //const registrationFieldsets = registrationFieldsets[0].map((field) => {
    //    if (field.name === "password" || field.name === "confirmPassword") {
    //        return { ...field, onChange: validatePassword };
    //    }
    //    return field;
    //});

    function handleSubmitRegistration () {
        const { username, email, password } = formData[0].fields;
        if (
            formErrors.length === 0
            && username 
            && email
            && password
        ) {
            const profile = { username };
            users.createWithEmailAndPassword(
                profile, 
                email,
                password
            );
        }
    }

    return (
        <Form 
            className = {styles.RegistrationForm}
            onSubmit  = {handleSubmitRegistration}
            errors    = {formErrors}
            schema    = {registrationFormSchema}
            onChange  = {handleOnFormChange}
        />
    );
}