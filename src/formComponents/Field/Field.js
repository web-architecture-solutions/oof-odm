import { forwardRef, useEffect, useState } from "react";

import Control from "../Control/Control";

import styles from "./Field.module.css";

function Field({ 
    name, 
    label, 
    type, 
    onChange, 
    autoComplete = null,
    options      = null,
    placeholder  = null
}, ref) {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (onChange) onChange(value);
    }, [value, onChange]);

    return (
        <label htmlFor={name}>
            <span className={styles.label}>
                {label}
            </span>
            
            <Control 
                autoComplete = {autoComplete}
                type         = {type}
                name         = {name}
                value        = {value ?? ""}
                onChange     = {({ target }) => setValue(target.value)}
                options      = {options}
                placeholder  = {placeholder}
                ref          = {ref}
            />
        </label>
    );
};

export default forwardRef(Field);