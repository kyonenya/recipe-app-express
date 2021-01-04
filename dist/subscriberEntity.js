"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
const isNameValid = (name) => {
    return name.length > 0;
};
const isZipCodeValid = (zipCode) => {
    return 10000 < zipCode && zipCode < 99999;
};
class Subscriber {
    constructor(name, email, zipcode) {
        this.name = name;
        this.email = email;
        this.zipcode = zipcode;
        if (!isNameValid(this.name))
            throw new Error('不正な名前です');
        if (!isZipCodeValid(this.zipcode))
            throw new Error('不正なzipCodeです');
    }
}
exports.Subscriber = Subscriber;
;
