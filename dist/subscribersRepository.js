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
exports.selectByEmail = exports.insertOne = exports.selectAll = void 0;
const subscriberEntity_1 = require("./subscriberEntity");
// inverse DTO -> useCase
const entitize = ({ name, email, zipcode }) => {
    return { name, email, zipCode: zipcode };
};
const selectAll = (dbExecutor) => __awaiter(void 0, void 0, void 0, function* () {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        const sql = 'SELECT * FROM subscribers';
        const queryResult = yield dbExecutor(sql);
        return queryResult.rows.map((row) => entitize(row));
    });
});
exports.selectAll = selectAll;
const insertOne = (dbExecutor, subscriber) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO subscribers (name, email, zipcode) VALUES ($1, $2, $3);';
    const params = [subscriber.name, subscriber.email, subscriber.zipcode];
    const queryResult = yield dbExecutor(sql, params);
    return queryResult.rowCount === 1;
});
exports.insertOne = insertOne;
const selectByEmail = (dbExecutor, email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM subscribers WHERE "email" = $1';
    const params = [email];
    const queryResult = yield dbExecutor(sql, params);
    if (queryResult.rowCount === 0)
        return null;
    return new subscriberEntity_1.Subscriber(entitize(queryResult.rows[0]));
});
exports.selectByEmail = selectByEmail;
