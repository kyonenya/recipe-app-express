import express from 'express';
import layouts from 'express-ejs-layouts';
import * as homeController from './homeController';
import * as subscribersController from './subscribersController';
import * as errorController from './errorController';

const app = express();
app.set('port', process.env['WEB_APP_PORT'] || 3000);

// enable ejs
app
  .set('view engine', 'ejs')
  .use(layouts);

// analyze request body
app
  .use(express.urlencoded({ extended: false }))
  .use(express.json());

// route
app
  .use(express.static('public'))
  .get('/', (req, res) => res.send('ようこそコンフェッティ・キュイジンへ'))
  .get('/courses', homeController.showCourses)
  .get('/contact', (req, res) => homeController.render('contact', req, res))
  .get('/subscribers', subscribersController.getAllSubscribers)
  .post('/contact', (req, res) => homeController.render('thanks', req, res))

// catch errors
app
  .use(errorController.notFound)
  .use(errorController.internalError);

app.listen(app.get('port'), () => console.log(`listening... port: ${app.get('port')}`));
