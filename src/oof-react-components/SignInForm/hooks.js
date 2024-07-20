import { useState } from "react";

export function useSignInFormValidation() {
    const [serverErrors, setServerErrors] = useState([]);
    
    return { formErrors: [...serverErrors], setServerErrors };
}