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
exports.update = exports.findByEmail = exports.readAll = void 0;
const readAll = (execSelectAll) => __awaiter(void 0, void 0, void 0, function* () {
    return yield execSelectAll();
});
exports.readAll = readAll;
const findByEmail = (invokeFindByEmail, email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invokeFindByEmail(email);
});
exports.findByEmail = findByEmail;
const update = (invokeUpdate, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invokeUpdate(user);
});
exports.update = update;
