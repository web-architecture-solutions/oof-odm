import { forwardRef } from "react";

import Input  from "../Input/Input";
import Select from "../Select/Select";

const ControlType = { select: "select" };

function Control({ 
    type, 
    name, 
    value, 
    onChange, 
    className    = "",
    autoComplete = null,
    placeholder  = null,
    options      = null 
}, ref) {    
    switch (type) {
        case ControlType.select:
            return (
                <Select 
                    className   = {className}
                    name        = {name}
                    value       = {value}
                    onChange    = {onChange}
                    options     = {options}
                    ref         = {ref}
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
                    onChange     = {onChange}
                    placeholder  = {placeholder}
                    ref          = {ref}
                />
            );
    }
}

export default forwardRef(Control);