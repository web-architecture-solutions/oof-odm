export default class FieldsetSchemata extends Array {
    initializeProps(props) {
        for (let index = 0; index < this.length; index++) {
            const fieldsetSchema       = this[index]
            const fieldsetProps        = props[index];
            const fieldSchemata        = fieldsetSchema.fields;
            const fieldSchemaWithProps = fieldSchemata.initializeProps(fieldsetProps);
            const fieldsetSchemaWithProps = { 
                ...fieldsetSchema, 
                fields: fieldSchemaWithProps 
            };
            this[index] = fieldsetSchemaWithProps;
        }
    }

    static fieldReducerFactory(fieldAccumulator) {
        return (accumulatedFields, { name }) => {
            return [ ...accumulatedFields, fieldAccumulator(name)];
        };
    }
    
    static fieldsetReducerFactory(fieldAccumulator) {
        return (accumulatedFieldsets, { fields }) => {
            const fieldReducer 
                = FieldsetSchemata.fieldReducerFactory(fieldAccumulator);
            const reducedFields = fields.reduce(fieldReducer, []);
            return [...accumulatedFieldsets, ...reducedFields];
        };
    };

    get initialEditState() {
        const fieldAccumulator = (name) => ([name, false]);
        const fieldsetReducer 
            = FieldsetSchemata.fieldsetReducerFactory(fieldAccumulator);
        return Object.fromEntries(this.reduce(fieldsetReducer, []));
    }
}