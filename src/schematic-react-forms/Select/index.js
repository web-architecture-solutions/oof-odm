import { forwardRef } from "react";

import Option from "../Option";

function Select({ 
    name, 
    value, 
    onChange, 
    options,
    className
}, ref) {
    return (
        <select 
            className = {className}
            name      = {name}
            value     = {value}
            onChange  = {onChange}
            ref       = {ref}
        >
            {options.map((option) =>
                <Option {...option} key={option.value} />
            )}
        </select>
    );
}

export default forwardRef(Select);