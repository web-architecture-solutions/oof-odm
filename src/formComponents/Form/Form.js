import Fieldset from "../Fieldset/Fieldset";

export default function Form({ schema }) {
    return (
        <form>
            {schema.map((fieldsetSchema) =>
                <Fieldset {...fieldsetSchema} key={fieldsetSchema.legend} />
            )}
        </form>
    );
}