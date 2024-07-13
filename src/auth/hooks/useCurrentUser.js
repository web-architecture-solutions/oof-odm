import { useEffect, useState } from "react";

export default function useCurrentUser({ firebase, setIsLoading }) {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const unsubscribeFromCurrentUser = firebase.onUserChange(
            setCurrentUser,
            setIsLoading
        );
        return () => unsubscribeFromCurrentUser(); 
    }, [firebase, setIsLoading]);
    return currentUser;
}