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
exports.storeSubscriber = exports.showAllSubscribers = void 0;
const subscriberEntity_1 = require("./subscriberEntity");
const subscriberRepository = __importStar(require("./subscriberRepository"));
const subscriberUseCase = __importStar(require("./subscriberUseCase"));
const showAllSubscribers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribers = yield subscriberUseCase.readAll(subscriberRepository.selectAll // DI、スイッチを渡す
        );
        res.render('subscribers', { subscribers });
    }
    catch (err) {
        // console.error(err);
    }
});
exports.showAllSubscribers = showAllSubscribers;
const storeSubscriber = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
        const emailResult = yield subscriberUseCase.findEmail(subscriberRepository.selectByEmail, reqBody.email);
        if (emailResult.rowCount > 0) {
            throw new Error('メールアドレスが既に登録されています');
        }
        return reqBody;
    });
    try {
        const reqBody = yield validate(req.body);
        const subscriber = new subscriberEntity_1.Subscriber(reqBody.name, reqBody.email, reqBody.zipcode);
        const response = yield subscriberUseCase.createOne(subscriberRepository.insertOne, subscriber);
        res.render('thanks');
    }
    catch (err) {
        next(err);
    }
});
exports.storeSubscriber = storeSubscriber;
