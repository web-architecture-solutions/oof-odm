import { forwardRef, useEffect, useState } from "react";

import Control from "../Control";

import { useFieldValidation } from "./hooks";

function Field({
    name,
    label,
    type,
    updateFieldsetData,
    updateFieldsetErrors,
    setHasUserEditedForm,
    onChange         = null,
    onValidate       = null,
    isRequired       = false,
    pattern          = "",
    className        = "",
    controlClassName = "",
    autoComplete     = null,
    options          = null,
    placeholder      = null
}, ref) {
    const [value, setValue] = useState(null);

    const hasUserEdited = value !== null;

    useEffect(() => {
        if (hasUserEdited) {
            setHasUserEditedForm((prevMap) => {
                return { ...prevMap, [name]: true };
            });        
        }
    }, [name, hasUserEdited, setHasUserEditedForm]);
    
    const fieldErrors  = useFieldValidation({ 
        isRequired, 
        value, 
        type, 
        hasUserEdited 
    });
    
    const isFieldError = fieldErrors.length > 0;

    useEffect(() => {
        updateFieldsetData({ [name]: value });
    }, [name, value, updateFieldsetData]);

    useEffect(() => {
        updateFieldsetErrors({ [name]: fieldErrors });
    }, [name, fieldErrors, updateFieldsetErrors]);
    
    useEffect(() => {
        if (onChange) onChange({ [name]: value });
    }, [name, value, onChange]);

    useEffect(() => {
        if (onValidate) onValidate({ [name]: value });
    }, [name, value, onValidate]);

    return (
        <div className={className}>
            <label htmlFor={name}>{label}</label>

            <Control
                autoComplete = {autoComplete}
                className    = {controlClassName}
                type         = {type}
                name         = {name}
                isRequired   = {isRequired}
                value        = {value ?? ""}
                onChange     = {({ target }) => setValue(target.value)}
                options      = {options}
                pattern      = {pattern}
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
