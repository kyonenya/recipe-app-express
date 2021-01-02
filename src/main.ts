import express from 'express';
import * as homeController from './homeController';

const app = express();
app.set('port', process.env['WEB_APP_PORT'] || 3000);

// analyze request body
app
  .use(express.urlencoded({ extended: false }))
  .use(express.json());

// route
app
  .get('/', (req, res) => res.send('ようこそコンフェッティ・キュイジンへ'))
  .get('/courses', (req, res) => homeController.render('courses', req, res))
  .get('/contact', (req, res) => homeController.render('contact', req, res))
  .post('/contact', (req, res) => homeController.render('thanks', req, res))

app.listen(app.get('port'), () => console.log(`listening... port: ${app.get('port')}`));
