import { forwardRef, useEffect, useState } from "react";

import Control from "../Control/Control";

import styles from "./Field.module.css";

const initialErrors = { "form/field-is-required": null };

function errorReducer(fieldErrors, error) {
    return error === null ? { 
        ...fieldErrors, 
        "form/field-is-required": null  
    } : { 
        ...fieldErrors, 
        [error.code]: error 
    };
}

class FormError extends Error {
    constructor({ code, message }) {
        super(message);
        this.code = code:
        this.name = "FormError";
    }
}

function Field({ 
    name, 
    label, 
    type, 
    onChange         = null,
    onError          = null,
    isRequired       = false,
    className        = "",
    controlClassName = "",
    autoComplete     = null,
    options          = null,
    placeholder      = null
}, ref) {
    const [value          ,           setValue] = useState(null);
    const [fieldErrors, dispatchError] = useReducer(errorReducer, initialErrors);

    const hasUserEdited = value !== null;    

    useEffect(() => {
        const isRequiredFieldSatisfied = isRequired && !value && hasUserEdited;
        const isRequiredError = !isRequiredFieldSatisfied
            ? new FormError({
                code   : "form/field-is-required",
                message: "Field is required"
              })
            : null;

        dispatchError(isRequiredError);
        
    }, [isRequired, value, hasUserEdited]);

    useEffect(() => {
        if (onChange) onChange(value);
    }, [value, onChange]);

    useEffect(() => {
        if (onError) onError(isRequiredError);
    }, 
    return (
        <label htmlFor={name} className={className}>
            <span className={styles.label}>
                {label}
            </span>
            
            <Control 
                autoComplete = {autoComplete}
                className    = {controlClassName}
                type         = {type}
                name         = {name}
                value        = {value ?? ""}
                onChange     = {({ target }) => setValue(target.value)}
                options      = {options}
                placeholder  = {placeholder}
                ref          = {ref}
            />

            {Object.keys(fieldErrors).length > 0 ? Object.values(fieldErrors).filter(Boolean).map(({ message }) => 
                <span>{message}</span>
            ) : null}
        </label>
    );
};

export default forwardRef(Field);