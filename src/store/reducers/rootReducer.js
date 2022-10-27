/* eslint-disable import/prefer-default-export */
import { combineReducers } from 'redux';
import countReducer from './countReducer';

export const rootReducer = combineReducers({ count: countReducer });
