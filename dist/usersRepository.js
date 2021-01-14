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
exports.update = exports.insertOne = exports.selectByEmail = exports.selectAll = void 0;
const userEntity_1 = require("./userEntity");
const monad_1 = require("./monad");
const entitize = (row) => {
    return new userEntity_1.User({
        name: {
            firstName: row.firstname,
            lastName: row.lastname,
        },
        email: row.email,
        zipcode: row.zipcode.toString(),
    });
};
const selectAll = (dbExecutor) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM users';
    const queryResult = yield dbExecutor(sql);
    return queryResult.rows.map((row) => entitize(row));
});
exports.selectAll = selectAll;
const selectByEmail = (dbExecutor) => (email) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM users WHERE "email" = $1';
    const params = [email];
    const queryResult = yield dbExecutor(sql, params);
    if (queryResult.rowCount === 0)
        return null;
    return entitize(queryResult.rows[0]);
});
exports.selectByEmail = selectByEmail;
const insertOne = (dbExecutor) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    INSERT INTO users 
      (firstname, lastname, email, zipcode, password)
    VALUES
      ($1, $2, $3, $4, $5)
    ;
  `;
    const params = [user.name.firstName, user.name.lastName, user.email, user.zipcode, user.password];
    try {
        const queryResult = yield dbExecutor(sql, params);
        if (queryResult.rowCount !== 1)
            return monad_1.Left.of('DB Error: Insertion failed.');
        return monad_1.Right.of(true);
    }
    catch (err) {
        return monad_1.Left.of(err);
    }
    ;
});
exports.insertOne = insertOne;
const update = (dbExecutor) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    UPDATE users
    SET
      "firstname" = $2
      ,"lastname" = $3
      ,"zipcode" = $4
      ,"password" = $5
    WHERE email = $1;
  `;
    const params = [user.email, user.name.firstName, user.name.lastName, user.zipcode, user.password];
    const queryResult = yield dbExecutor(sql, params);
    console.log(user);
    console.log(params);
    console.log(queryResult);
    return queryResult.rowCount === 1;
});
exports.update = update;
