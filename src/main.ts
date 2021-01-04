import express, { NextFunction } from 'express';
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

// async wrapper
//const wrap = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
//  return fn(req, res, next)
//    .catch(next);
//}

// route
app
  .use(express.static('public'))
  .get('/', (req, res) => homeController.render('index', req, res))
  .get('/courses', homeController.showCourses)
  .get('/contact', (req, res) => homeController.render('contact', req, res))
  .post('/subscribe', subscribersController.storeSubscriber)
  .get('/subscribers', subscribersController.showAllSubscribers)

// catch errors
app
  .use(errorController.notFound)
  .use(errorController.internalError);

app.listen(app.get('port'), () => console.log(`listening... port: ${app.get('port')}`));
