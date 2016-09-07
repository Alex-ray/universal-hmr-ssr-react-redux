
import {
  compose,
  createStore
} from 'redux';

import {combineReducers} from 'redux-immutablejs';
import {Map as iMap} from 'immutable';
import {routing} from './routing';

const currentReducers = { routing };

export default ( ) => {
  const reducer = combineReducers({...currentReducers});
  const store   = createStore(reducer, iMap());

  return store;
};
