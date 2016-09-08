
import {
  compose,
  createStore,
  applyMiddleware
} from 'redux';

import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import {Map as iMap} from 'immutable';
import reducer from './reducers';

export default (initialState) => {
  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const middlewares = [reduxRouterMiddleware];

  initialState = initialState || iMap();

  const store   = createStore(reducer, initialState, applyMiddleware(...middlewares));


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
