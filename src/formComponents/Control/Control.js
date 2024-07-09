import Input  from "../Input/Input";
import Select from "../Select/Select";

const ControlType = {
    select: "select"
};

export default function Control({ 
    type, 
    name, 
    value, 
    onChange, 
    placeholder = null,
    options     = null 
}) {
    switch (type) {
        case ControlType.select:
            return (
                <Select 
                    name        = {name}
                    value       = {value}
                    onChange    = {onChange}
                    options     = {options}
                />
            );
        default:
            return (
                <Input 
                    name        = {name}
                    type        = {type}
                    value       = {value}
                    onChange    = {onChange}
                    placeholder = {placeholder}
                />
            );
    }
}