import { createStore } from 'redux';
import AppState from './state';
import { Actions } from './actions';
import { appReducer } from './reducer';

const store = createStore<AppState, Actions, {}, {}>(appReducer);

export default store;