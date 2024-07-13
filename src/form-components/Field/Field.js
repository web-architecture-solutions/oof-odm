import { forwardRef, useEffect, useState } from "react";

import Control from "../Control/Control";

import useFieldValidation from "./useFieldValidation";

import styles from "./Field.module.css";

function Field({
    name,
    label,
    type,
    incrementFormKey,
    incrementFieldsetKey,
    onChange         = null,
    onError          = null,
    isRequired       = false,
    className        = "",
    controlClassName = "",
    autoComplete     = null,
    options          = null,
    placeholder      = null,
}, ref) {
    const [value, setValue] = useState(null);

    const fieldErrors  = useFieldValidation({ isRequired, value });
    const isFieldError = fieldErrors.length > 0;
    
    useEffect(() => {
        if (onChange) {
            onChange(value) 
        } else {
            incrementFormKey(); 
            incrementFieldsetKey();
        }
    }, [value, onChange]);

    useEffect(() => {
        if (onError) onError(fieldErrors);
    }, [onError, fieldErrors]);

    return (
        <label htmlFor={name} className={className}>
            <span className={styles.label}>{label}</span>

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

            {isFieldError ? fieldErrors.map(({ message }, index) => 
                <span key={index}>{message}</span>
            ) : null}
        </label>
    );
}

export default forwardRef(Field);
