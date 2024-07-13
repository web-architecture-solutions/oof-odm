export class FieldError extends Error {
    constructor({ code, message }) {
        super(message);
        this.code = code;
        this.name = "FieldError";
    }
}