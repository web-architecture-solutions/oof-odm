export default function Button({ children, onClick }) {
    function _onClick(event) {
        event.preventDefault();
        onClick();
    }
    
    return <button onClick={_onClick}>{children}</button>;
}