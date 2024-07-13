export default function Button({ 
    children, 
    onClick, 
    className = "",
    disabled  = null
}) {
    function _onClick(event) {
        event.preventDefault();
        onClick();
    }
    
    return (
        <button 
            disabled  = {disabled}
            onClick   = {_onClick}
            className = {className}
        >
            {children}
        </button>
    );
}