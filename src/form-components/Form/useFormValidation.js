import { useCallback } from "react";

import useFormErrors from "./useFormErrors";

export default function useRegistrationFormValidation(_validator, triggers) {
    const { formErrors, dispatchFormErrors } = useFormErrors();     
    const validator = useCallback(() => {
        dispatchFormErrors(_validator(...triggers));
    }, [...triggers, dispatchFormErrors]);
    return [formErrors, validator];
}
