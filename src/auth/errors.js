export class RegistrationError extends Error {
    constructor({ code, message }) {
        super(message); 
        this.code = code;
        this.name = "RegistrationError";
    }
}