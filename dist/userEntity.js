"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    //  public readonly createdAt = null;
    //  public readonly updatedAt = null;
    constructor({ name, email, zipcode, password }) {
        this.password = '';
        this.name = name;
        this.fullName = name.firstName + name.lastName;
        this.email = email;
        this.zipcode = zipcode;
        if (password)
            this.password = password;
    }
    ;
}
exports.User = User;
;
