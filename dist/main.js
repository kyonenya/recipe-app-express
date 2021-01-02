"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.set('port', process.env['WEB_APP_PORT'] || 3000);
app.get('/', (req, res) => {
    res.send('ようこそコンフェッティ・キュイジンへ');
});
// analyze request body
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.listen(app.get('port'), () => {
    console.log(`listening... port: ${app.get('port')}`);
});
