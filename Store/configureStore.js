import { combineReducers, createStore } from 'redux';
import authReducer from './Reducers/authenticationReducer'
import toggleInventoryRow from './Reducers/inventorierReducer'


export default createStore(authReducer)