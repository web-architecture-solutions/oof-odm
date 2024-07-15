import { forwardRef, useEffect, useState } from "react";

import Control from "../Control/Control";

import useFieldValidation from "./useFieldValidation";

function Field({
    name,
    label,
    type,
    updateFieldsetData,
    onChange         = null,
    onError          = null,
    isRequired       = false,
    className        = "",
    controlClassName = "",
    autoComplete     = null,
    options          = null,
    placeholder      = null
}, ref) {
    const [value, setValue] = useState(null);

    const fieldData    = { [name]: value };
    const fieldErrors  = useFieldValidation({ isRequired, value });
    const isFieldError = fieldErrors.length > 0;

    useEffect(() => {
        updateFieldsetData(fieldData);
    }, [name, value, updateFieldsetData]);
    
    useEffect(() => {
        if (onChange) onChange(fieldData);
    }, [name, value, onChange]);

    useEffect(() => {
        if (onError) onError(fieldErrors);
    }, [onError, fieldErrors]);

    return (
        <div className={className}>
            <label htmlFor={name}>{label}</label>

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

            {isFieldError ? fieldErrors.map(({ code, message }) => 
                <span key={code}>{message}</span>
            ) : null}
        </div>
    );
}

export default forwardRef(Field);
