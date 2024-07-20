export default class FieldSchemata extends Array {
    get initialValues() {
        return Object.fromEntries(this.map(({ name }) => ([name, null])));
    }

    initializeProps(fieldsetProps) {
        return this.map((fieldSchema) => {
            const fieldProps = fieldsetProps[fieldSchema.name];
            return { ...fieldSchema, ...fieldProps };
        });
    }
}