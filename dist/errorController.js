"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalError = exports.notFound = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const notFound = (req, res) => {
    const errCode = http_status_codes_1.default.NOT_FOUND;
    res.status(errCode);
    res.send('Not found.');
};
exports.notFound = notFound;
const internalError = (err, req, res, next) => {
    console.error(err.stack);
    const errCode = http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    res.status(errCode);
    res.send(`${errCode} | Sorry, our application is experiencing a problem.`);
};
exports.internalError = internalError;
