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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const method_override_1 = __importDefault(require("method-override"));
const homeController = __importStar(require("./homeController"));
const userController = __importStar(require("./userContoroller"));
const subscriberController = __importStar(require("./subscriberController"));
const errorController = __importStar(require("./errorController"));
const app = express_1.default();
app.set('port', /* process.env['WEB_APP_PORT'] || */ 3000);
// enable ejs
app
    .set('view engine', 'ejs')
    .use(express_ejs_layouts_1.default);
// analyze request body
app
    .use(express_1.default.urlencoded({ extended: false }))
    .use(express_1.default.json());
// PUT DELETE
app.use(method_override_1.default('_method', { methods: ['POST', 'GET'] }));
// async wrapper
const asyncer = (fn) => (req, res, next) => {
    return fn(req, res, next).catch(next);
};
// route
app
    .use(express_1.default.static('public'))
    .get('/', (req, res) => homeController.render('index', req, res))
    .get('/courses', homeController.showCourses)
    .get('/contact', (req, res) => homeController.render('contact', req, res))
    .post('/subscribe', asyncer(subscriberController.storeSubscriber))
    .get('/subscribers', asyncer(subscriberController.showAllSubscribers))
    .get('/users', asyncer(userController.showAllUsers))
    .get('/users/new', (req, res) => homeController.render('users/new', req, res))
    .post('/users/create', asyncer(userController.createUser))
    .get('/users/:email/edit', asyncer(userController.showEditForm))
    .put('/users/:email/update', asyncer(userController.putUser));
// catch errors
app
    .use(errorController.notFound)
    .use(errorController.internalError);
app.listen(app.get('port'), () => console.log(`listening... port: ${app.get('port')}`));
