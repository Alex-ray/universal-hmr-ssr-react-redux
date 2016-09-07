import React from 'react';
import {push} from 'react-router-redux';
import {renderToStaticMarkup} from 'react-dom-stream/server';

import Html from './Html';
import createStore from '../universal/redux/createStore';

function renderApp(res, store, assets, renderProps) {
  const location = renderProps && renderProps.location && renderProps.location.pathname || '/';
  // Needed so some components can render based on location
  store.dispatch(push(location));
  const htmlStream = renderToStaticMarkup(
    <Html
      title="Super Future"
      store={store}
      assets={assets}
      renderProps={renderProps}
    />
  );

  res.write('<!DOCTYPE html>');

  htmlStream.pipe(res, {end: false});
  htmlStream.on('end', () => res.end());
}

export const renderPage = function (req, res) {
  const store = createStore( );
  renderApp(res, store);
};

export const renderDevPage = function (req, res) {
  const store = createStore( );
  renderApp(res, store);
};

export default renderPage;
