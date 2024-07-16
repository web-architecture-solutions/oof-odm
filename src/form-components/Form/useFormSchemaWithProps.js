export default function useFormSchemaProps(formSchema, fieldProps) {
    const formSchemaWithProps = formSchema.map((fieldsetSchema, index) => {
        const fieldsetProps        = fieldProps[index];
        const fieldSchemata        = fieldsetSchema.fields;
        const fieldSchemaWithProps = fieldSchemata.map((fieldSchema) => {
            const fieldProps = fieldsetProps[fieldSchema.name];
            return { ...fieldSchema, ...fieldProps };
        });
        const fieldsetSchemaWithProps = { 
            ...fieldsetSchema, 
            fields: fieldSchemaWithProps 
        };
        return fieldsetSchemaWithProps;
    });
    return formSchemaWithProps;
}