import React from 'react';
import {push} from 'react-router-redux';
import {renderToStaticMarkup} from 'react-dom-stream/server';

import Html from './Html';
import createStore from '../universal/redux/createStore';

function renderApp(res, store, assets, renderProps) {
  const location = renderProps && renderProps.location && renderProps.location.pathname || '/';
  // Needed so some components can render based on location
  // store.dispatch(push(location));

  /**
   * Note: react-dom-strem is calling the PropTypes directly which will cause the code to break in
   * React 16, waiting on a PR for issue https://github.com/aickin/react-dom-stream/issues/22
   *
   * see https://facebook.github.io/react/warnings/dont-call-proptypes.html
   **/

  const htmlStream = renderToStaticMarkup(
    <Html
      title="HMR | SSR | FTW"
      store={store}
      assets={assets}
      renderProps={renderProps}
    />
  );

  res.write('<!DOCTYPE html>');

  htmlStream.pipe(res, {end: false});
  htmlStream.on('end', () => res.end());
}

export const renderPage = (req, res) => {
  const store = createStore( );
  renderApp(res, store);
};

export const renderDevPage = (req, res) => {
  const store = createStore( );
  renderApp(res, store);
};

export default renderPage;
