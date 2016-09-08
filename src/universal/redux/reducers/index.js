import {combineReducers} from 'redux-immutablejs';
import {routing}         from './routing';
import counter           from '../../modules/counter/ducks/counter.js';

const currentReducers = {
  routing,
  counter
};

export default combineReducers({...currentReducers});
