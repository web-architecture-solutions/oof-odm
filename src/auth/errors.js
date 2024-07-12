export class PasswordError extends Error {
    constructor({ code, message }) {
        super(message); 
        this.code = code;
        this.name = "PasswordError";
    }
}