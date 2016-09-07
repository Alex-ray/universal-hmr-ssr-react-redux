import express from 'express';

import {
  renderPage,
  renderDevPage
} from './ssr';


const PROD = process.env.NODE_ENV === 'production';

const app = express();


if (PROD) {
  app.get('*', renderPage);
} else if (!PROD) {
  app.get('*', renderDevPage);
}


app.listen(3000, function () {
  console.log('>>>> RUNNING ON localhost:3000');
});
