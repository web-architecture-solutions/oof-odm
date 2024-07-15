export default function useEnrichedFormSchema(formSchema, formControls) {
    const enrichedFormSchema = formSchema.map((fieldset, index) => {
        const fieldsetControls   = formControls[index];
        const fieldsWithControls = fieldset.fields.map((field) => {
            const fieldControls = fieldsetControls[field.name];
            return { ...field, ...fieldControls };
        });
        const newFieldset = { ...fieldset, fields: fieldsWithControls };
        return newFieldset;
    });
    return enrichedFormSchema;
}