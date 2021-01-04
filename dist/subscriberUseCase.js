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
const readAll = (selectAll, executor) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield selectAll(executor);
    return data.rows;
});
exports.readAll = readAll;
const createOne = (subscriber, createSubscriber) => __awaiter(void 0, void 0, void 0, function* () {
    const values = [subscriber.name, subscriber.email, subscriber.zipCode];
    return createSubscriber(values);
});
exports.createOne = createOne;
const findEmail = (email, selectByEmail) => __awaiter(void 0, void 0, void 0, function* () {
    return selectByEmail([email]);
});
exports.findEmail = findEmail;
