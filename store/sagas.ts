import { all } from 'redux-saga/effects';

import productsSaga from './modules/product/sagas';

export default function* rootSaga() {
  yield all([productsSaga()]);
}
