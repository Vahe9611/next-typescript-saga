import * as types from './types';
import ProductsApi from '@/libs/api/products';
import { all, fork, put, takeLatest } from 'redux-saga/effects'

const api = new ProductsApi();

function* getProducts({ payload }: any) {
  try {
    const { data } = yield api.list({ params: payload });
    yield put({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: types.GET_PRODUCTS_FAILURE,
      payload: {},
    });
  }
}

function* getProductItem ({ payload }: any) {
  try {
    const { data } = yield api.get(payload);
    yield put({
      type: types.GET_PRODUCT_ITEM_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: types.GET_PRODUCT_ITEM_FAILURE,
      payload: e.response?.data || 'Something went wrong.',
    });
  }
}

function* watchGetProducts() {
    yield takeLatest(types.GET_PRODUCTS_REQUEST, getProducts)
}

function* watchGetProductItem() {
  yield takeLatest(types.GET_PRODUCT_ITEM_REQUEST, getProductItem)
}

export default function* productsSaga() {
    yield all([
        fork(watchGetProducts),
        fork(watchGetProductItem),
    ])
}
