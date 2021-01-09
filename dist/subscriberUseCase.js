"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEmail = exports.createOne = exports.readAll = void 0;
// DTO -> repository
const schemize = ({ name, email, zipCode }) => {
    return { name, email, zipcode: zipCode };
};
;
const readAll = (invokeReadAll) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invokeReadAll();
});
exports.readAll = readAll;
const createOne = (execInsertOne, subscriber) => __awaiter(void 0, void 0, void 0, function* () {
    return yield execInsertOne(schemize(subscriber));
});
exports.createOne = createOne;
const findEmail = (execSelectByEmail) => __awaiter(void 0, void 0, void 0, function* () {
    return yield execSelectByEmail();
});
exports.findEmail = findEmail;
