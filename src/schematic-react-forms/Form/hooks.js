function fieldsetErrorReducer(
    accumulatedFieldsetErrors, 
    currentFieldsetErrors
) {
    const flattendFieldsetErrors = Object.values(currentFieldsetErrors).flat();
    return [...accumulatedFieldsetErrors, ...flattendFieldsetErrors];
}

export default function useFieldErrors(fieldsetErrors) {
    return Object.values(fieldsetErrors).reduce(fieldsetErrorReducer, []);
}