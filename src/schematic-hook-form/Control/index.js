import { forwardRef } from "react";

import Input  from "../Input";
import Select from "../Select";

const ControlType = { select: "select" };

function Control({ 
    type, 
    name, 
    value, 
    onChange, 
    className    = "",
    pattern      = "",
    autoComplete = null,
    placeholder  = null,
    options      = null,
    isRequired   = false
}, ref) {    
    switch (type) {
        case ControlType.select:
            return (
                <Select 
                    className = {className}
                    name      = {name}
                    value     = {value}
                    onChange  = {onChange}
                    required  = {isRequired}
                    options   = {options}
                    ref       = {ref}
                />
            );
        default:
            return (
                <Input 
                    className    = {className}    
                    autoComplete = {autoComplete}
                    name         = {name}
                    type         = {type}
                    value        = {value}
                    required     = {isRequired}
                    pattern      = {pattern}
                    onChange     = {onChange}
                    placeholder  = {placeholder}
                    ref          = {ref}
                />
            );
    }
}

export default forwardRef(Control);