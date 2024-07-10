export default function useProfile({ usernameRef }) {
    return { 
        username: usernameRef.current.value 
    };
}