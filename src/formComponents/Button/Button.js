export default function Button({ 
    children, 
    onClick, 
    disabled = null 
}) {
    function _onClick(event) {
        event.preventDefault();
        onClick();
    }
    
    return (
        <button 
            disabled = {disabled}
            onClick  = {_onClick}
        >
            {children}
        </button>
    );
}