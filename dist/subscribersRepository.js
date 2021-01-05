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
// ↓Repository should not know about Framework Layer
// import * as postgres from './postgres';
const selectAll = (executor) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM subscribers';
    return yield executor(sql);
});
exports.selectAll = selectAll;
const insertOne = (executor, subscriber) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO subscribers (name, email, zipcode) VALUES ($1, $2, $3);';
    const params = [subscriber.name, subscriber.email, subscriber.zipcode];
    return yield executor(sql, params);
});
exports.insertOne = insertOne;
const selectByEmail = (executor, email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM subscribers WHERE "email" = $1';
    const params = [email];
    return yield executor(sql, params);
});
exports.selectByEmail = selectByEmail;
