import express, { NextFunction } from 'express';
import layouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
import * as homeController from './homeController';
import * as userController from './userContoroller';
import * as subscriberController from './subscriberController';
import * as errorController from './errorController';

const app = express();
app.set('port', /* process.env['WEB_APP_PORT'] || */ 3000);

// enable ejs
app
  .set('view engine', 'ejs')
  .use(layouts);
// analyze request body
app
  .use(express.urlencoded({ extended: false }))
  .use(express.json());
// PUT DELETE
app.use(methodOverride('_method', { methods: ['POST', 'GET']} ));

// async wrapper
const asyncer = (fn: any) => (req: any, res: any, next: any) => {
  return fn(req, res, next).catch(next);
};

// route
app
  .use(express.static('public'))
  .get('/', (req, res) => homeController.render('index', req, res))
  .get('/courses', homeController.showCourses)
  .get('/contact', (req, res) => homeController.render('contact', req, res))
  .post('/subscribe', asyncer(subscriberController.storeSubscriber))
  .get('/subscribers', asyncer(subscriberController.showAllSubscribers))
  .get('/users', asyncer(userController.showAllUsers))
  .get('/users/new', (req, res) => homeController.render('users/new', req, res))
  .post('/users/create', asyncer(userController.createUser))
  .get('/users/:email/edit', asyncer(userController.showEditForm))
  .put('/users/:email/update', asyncer(userController.putUser))
  ;

// catch errors
app
  .use(errorController.notFound)
  .use(errorController.internalError);

app.listen(app.get('port'), () => console.log(`listening... port: ${app.get('port')}`));
