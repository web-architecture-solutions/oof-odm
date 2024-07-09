import { forwardRef, useEffect, useState } from "react";

import Control from "../Control/Control";

import styles from "./Field.module.css";

function Field({ 
    autoComplete = null,
    name, 
    label, 
    type, 
    value: initialValue = "", 
    onChange, 
    options     = null,
    placeholder = null
}, ref) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (onChange) onChange(value);
        if (ref) ref.current = value;
    }, [value, onChange, ref]);

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
            />
        </label>
    );
};

export default forwardRef(Field);