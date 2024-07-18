export default class FieldsetSchemata extends Array {
    initializeProps(props) {
        for (let index = 0; index < this.length; index++) {
            const fieldsetSchema       = this[index]
            const fieldsetProps        = props[index];
            const fieldSchemata        = fieldsetSchema.fields;
            const fieldSchemaWithProps = fieldSchemata.map((fieldSchema) => {
                const fieldProps = fieldsetProps[fieldSchema.name];
                return { ...fieldSchema, ...fieldProps };
            });
            const fieldsetSchemaWithProps = { 
                ...fieldsetSchema, 
                fields: fieldSchemaWithProps 
            };
            this[index] = fieldsetSchemaWithProps;
        }
    }
}