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
exports.storeSubscriber = exports.isEmailDuplicated = exports.showAllSubscribers = void 0;
const subscriberEntity_1 = require("./subscriberEntity");
const postgres = __importStar(require("./postgres"));
const subscribersRepository = __importStar(require("./subscribersRepository"));
const subscriberUseCase = __importStar(require("./subscriberUseCase"));
const showAllSubscribers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subscribers = yield subscriberUseCase.readAll(() => subscribersRepository.selectAll(postgres.execute));
    res.render('subscribers', { subscribers });
});
exports.showAllSubscribers = showAllSubscribers;
const isEmailDuplicated = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return !((yield subscriberUseCase.findEmail(() => subscribersRepository.selectByEmail(postgres.execute, email))) === null);
});
exports.isEmailDuplicated = isEmailDuplicated;
const storeSubscriber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriber = new subscriberEntity_1.Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode,
    });
    if (yield exports.isEmailDuplicated(req.body.email)) {
        throw new Error('メールアドレスが既に登録されています');
    }
    const isSucceeded = yield subscriberUseCase.createOne((params) => subscribersRepository.insertOne(postgres.execute, params), subscriber);
    if (!isSucceeded)
        throw new Error('お手数ですがもう一度入力し直してください');
    res.render('thanks');
});
exports.storeSubscriber = storeSubscriber;
