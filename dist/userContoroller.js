"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.putUser = exports.createUser = exports.showEditForm = exports.showAllUsers = void 0;
const userEntity_1 = require("./userEntity");
const monad_1 = require("./monad");
const userUseCase = __importStar(require("./userUseCase"));
const usersRepository = __importStar(require("./usersRepository"));
const postgres = __importStar(require("./postgres"));
const entitizeRequest = (req) => new userEntity_1.User({
    name: { firstName: req.body.first, lastName: req.body.last },
    email: req.body.email,
    zipcode: req.body.zipCode,
    password: req.body.password,
});
const showAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userUseCase.readAll(() => usersRepository.selectAll(postgres.execute));
    res.render('users/index', { users });
});
exports.showAllUsers = showAllUsers;
const showEditForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const user = yield userUseCase.findByEmail(usersRepository.selectByEmail(postgres.execute), email);
    res.render('users/edit', { user });
});
exports.showEditForm = showEditForm;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const invokeCreateOne = usersRepository.insertOne(postgres.execute);
    // TODO: resolve Promise in chain
    monad_1.Right.of(req)
        .map(entitizeRequest)
        .map(invokeCreateOne)
        .then(console.log)
        .then((_) => res.redirect('/users'))
        .orElse(console.error);
    //  const user = entitizeRequest(req);
    //  const either = await invokeCreateOne(user);
    //  either.map((x) => console.log(x));
    //  res.redirect('/users');
});
exports.createUser = createUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const user = entitizeRequest(req);
    console.log('Controller', user);
    const result = yield userUseCase.update(usersRepository.update(postgres.execute), user);
    res.redirect('/users');
});
exports.putUser = putUser;
