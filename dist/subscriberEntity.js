"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = exports.isZipCodeValid = exports.isNameValid = void 0;
const isNameValid = (name) => {
    return name.length > 0;
};
exports.isNameValid = isNameValid;
const isZipCodeValid = (zipcode) => {
    return 10000 < zipcode && zipcode < 9999999;
};
exports.isZipCodeValid = isZipCodeValid;
class Subscriber {
    constructor(props) {
        this.name = props.name;
        this.email = props.email;
        this.zipcode = props.zipcode;
        if (!exports.isNameValid(this.name))
            throw new Error('不正な名前です');
        if (!exports.isZipCodeValid(this.zipcode))
            throw new Error('不正な郵便番号です');
    }
    ;
}
exports.Subscriber = Subscriber;
;
