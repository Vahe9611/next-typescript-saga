import { combineReducers } from 'redux';

import products from './modules/product/reducer';

const reducers = {
  products,
};

export default combineReducers(reducers);
