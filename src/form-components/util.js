export function aggregateFields(fields) {
    const fieldRecords = fields.flatMap(({ name, ref }) => {
        return Object.entries({ [name]: ref.current?.value });
    });
    const fieldsetData = Object.fromEntries(fieldRecords);
    return fieldsetData;
}

export function aggregateFieldsets(fieldsets) {
    const formData = fieldsets.map(({ fields }) => {
        const fieldsetData = aggregateFields(fields);
        return fieldsetData;
    });
    return formData;
}