import { useEffect, useRef } from "react";

import Field from "../Field/Field";

const conditionalFieldsetErrorMessage 
    = "Conditional Fieldsets must be given both a 'condition' and a 'fieldMap'";

export default function Fieldset({ 
    legend,
    className      = "",
    fieldClassName = "",
    fields         = null,
    fieldMap       = null,
    condition      = null
}) {
    if (condition && fieldMap) {
        fields = fieldMap[condition];
    } else if (condition || fieldMap) {
        throw new Error(conditionalFieldsetErrorMessage);
    }

    const fieldRefs = fields.map(({ ref }) => ref);

    return (
        <fieldset className={className}>
            {legend ? (
                <legend>{legend}</legend>
            ) : null}

            {fields ? fields.map((field, index) =>
                <Field 
                    className = {fieldClassName}
                    key       = {index}
                    {...field}
                />
            ) : null}
        </fieldset>
    );
}