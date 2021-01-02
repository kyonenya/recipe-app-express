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
exports.getAllSubscribers = void 0;
require('dotenv').config();
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
const getAllSubscribers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM contacts';
    const response = yield pool.query(query);
    // console.log(response['rows']);
    return response;
});
exports.getAllSubscribers = getAllSubscribers;
const insertOne = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        text: "INSERT INTO contacts (name, email, zipcode) VALUES ($1, $2, $3);",
        values: ['Freddie Mercury', 'fred@queen.com', 1234567],
    };
    const response = yield pool.query(query);
    console.log(response['rows']);
});
// insertOne();
exports.getAllSubscribers();
