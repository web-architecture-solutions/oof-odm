export class OOFReactError extends Error {
    constructor({ code, message }) {
        super(message);
        this.code = code;
        this.name = "OOFReactError";
    }
}

export class RegistrationError extends Error {
    constructor({ code, message }) {
        super(message); 
        this.code = code;
        this.name = "RegistrationError";
    }
}