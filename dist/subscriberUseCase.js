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
// ↓useCase should not know about Repository
// import * as subscriberRepository from './subscriberRepository';
const subscriberEntity_1 = require("./subscriberEntity");
const readAll = ({ selectAll, dbExecutor }) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield selectAll(dbExecutor);
    return data.rows.map(row => new subscriberEntity_1.Subscriber(row));
});
exports.readAll = readAll;
const createOne = ({ insertOne, dbExecutor, subscriber }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield insertOne(dbExecutor, subscriber);
});
exports.createOne = createOne;
const findEmail = ({ selectByEmail, dbExecutor, email }) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield selectByEmail(dbExecutor, email);
    const row = data.rows[0];
    return new subscriberEntity_1.Subscriber(row);
});
exports.findEmail = findEmail;
