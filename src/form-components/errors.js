export class FormError extends Error {
    constructor({ code, message }) {
        super(message);
        this.code = code:
        this.name = "FormError";
    }
}