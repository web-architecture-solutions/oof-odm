export default class FormSchema {
    constructor(fieldsetSchemata) {
        this.fieldsetSchemata = fieldsetSchemata;
        this._props           = null;
    }

    set props(value) { this._props = value; }

    get fieldsetSchemataWithProps() {
        return this.fieldsetSchemata.map((fieldsetSchema, index) => {
            const fieldsetProps        = this._props[index];
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
    }

    get current() {
        return this._props 
            ? this.fieldsetSchemataWithProps 
            : this.fieldsetSchemata;
    }
}