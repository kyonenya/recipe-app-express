import express from 'express';

const app = express();
app.set('port', process.env['WEB_APP_PORT'] || 3000);

app.get('/', (req, res) => {
  res.send('ようこそコンフェッティ・キュイジンへ');
})

// analyze request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(app.get('port'), () => {
  console.log(`listening... port: ${app.get('port')}`);
});
