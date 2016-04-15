import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import promiseMiddleware from '../middlewares/promiseMiddleware'

import user from '../reducers/user'
import menu from '../reducers/menu'
import xTable from '../reducers/xTable'
import addForm from '../reducers/addForm'
import editForm from '../reducers/editForm'
import shop from '../reducers/shop'

const reducer = combineReducers({user, menu, xTable, shop, addForm, editForm});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']})
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState, window.devToolsExtension ? window.devToolsExtension() : f => f);
}
