export default class FieldsetSchemata extends Array {
    initializeProps(props) {
        for (let i = 0; i < this.length; i++) {
            const fieldsetSchema       = this[i]
            const fieldsetProps        = props[i];
            const fieldSchemata        = fieldsetSchema.fields;
            const fieldSchemaWithProps = fieldSchemata.map((fieldSchema) => {
                const fieldProps = fieldsetProps[fieldSchema.name];
                return { ...fieldSchema, ...fieldProps };
            });
            const fieldsetSchemaWithProps = { 
                ...fieldsetSchema, 
                fields: fieldSchemaWithProps 
            };
            this[i] = fieldsetSchemaWithProps;
        }
    }
}