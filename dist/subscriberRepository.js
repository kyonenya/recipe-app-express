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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectByEmail = exports.insertOne = exports.selectAll = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// ↓Repository should not know about Framework Layer
// import * as postgres from './postgres';
const pg_1 = require("pg");
dotenv_1.default.config();
/**
 * @deprecated
 */
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
;
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
