import Option from "../Option/Option";

export default function Select({ 
    name, 
    value, 
    onChange, 
    options 
}) {
    return (
        <select 
            name     = {name}
            value    = {value}
            onChange = {onChange}
        >
            {options.map((option) =>
                <Option {...option} key={option.value} />
            )}
        </select>
    );
}