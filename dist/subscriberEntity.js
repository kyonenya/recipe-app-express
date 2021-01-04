"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
const isNameValid = (name) => {
    return name.length > 0;
};
class Subscriber {
    constructor(name, email, zipCode) {
        this.name = name;
        this.email = email;
        this.zipCode = zipCode;
        if (!isNameValid(this.name))
            throw new Error('不正な名前です');
    }
}
exports.Subscriber = Subscriber;
