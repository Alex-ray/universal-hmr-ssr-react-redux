import React from 'react';
import { Provider } from 'react-redux';
import {render} from 'react-dom';
import createStore from '../universal/redux/createStore';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import {Map as iMap } from 'immutable';
import Root from './Root';

const {
  routing
} = window.__INITIAL_STATE__;

//  routing is currently regular JS object
const initialState = iMap([
  ['routing', routing],
]);


const store = createStore(initialState);

const history = syncHistoryWithStore(
  browserHistory,
  store,
  {selectLocationState: state => state.get('routing')}
);

render(
  <Provider store={store}>
    <Root history={history} store={store}/>
  </Provider>,
  document.getElementById('root')
);
