import { forwardRef } from "react";

import Option from "../Option/Option";

function Select({ 
    name, 
    value, 
    onChange, 
    options 
}, ref) {
    return (
        <select 
            name     = {name}
            value    = {value}
            onChange = {onChange}
            ref      = {ref}
        >
            {options.map((option) =>
                <Option {...option} key={option.value} />
            )}
        </select>
    );
}

export default forwardRef(Select);