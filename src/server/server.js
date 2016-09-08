import http    from 'http';
import express from 'express';
import colors  from 'colors';

// Development Libraries
import webpack from 'webpack';
import devWebpackConfig from '../../webpack/webpack.config.dev';
import chokidar from 'chokidar';

import {
  renderPage,
  renderDevPage
} from './ssr';

const PROD = process.env.NODE_ENV === 'production';

const app = express();

// Production settings
if (PROD) {

  app.use('/static', express.static('build'));

  app.get('*', renderPage);

// Development settings
} else if (!PROD) {
  const compiler = webpack(devWebpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: devWebpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log
  }));

  app.get('*', renderDevPage);

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  const watcher = chokidar.watch('.', {ignored: /[\/\\]node_modules[\/\\]/});

  watcher.on('ready', function() {
    watcher.on('all', function() {
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]server[\/\\]/.test(id)) {
          console.log(`${'Clearing'.yellow} ${'/server/'.red+id.split(/[\/\\]server[\/\\]/)[1].red} ${'module cache from server'.yellow}`);
          delete require.cache[id];
        }
      });
    });
  });


  // Do "hot-reloading" of react stuff on the server
  // Throw away the cached client modules and let them be re-required next time
  compiler.plugin('done', function() {
    console.log("Clearing /client/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]client[\/\\]/.test(id)) {
        console.log(`${'Clearing'.yellow} ${'/server/'.red+id.split(/[\/\\]client[\/\\]/)[1].red} ${'module cache from server'.yellow}`);
        delete require.cache[id];
      } else if (/[\/\\]universal[\/\\]/.test(id)) {
        console.log(`${'Clearing'.yellow} ${'/server/'.red+id.split(/[\/\\]universal[\/\\]/)[1].red} ${'module cache from server'.yellow}`);
        delete require.cache[id];
      }
    });
  });
}

const server = http.createServer(app);

server.listen(3000, function() {
   const address = server.address();
   console.log(`${'>>>'.cyan} ${'Listening on:'.rainbow} ${'localhost::'.trap.magenta}${`${address.port}`.green}`);
 });
