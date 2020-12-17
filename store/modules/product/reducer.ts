import { Action } from '@/types/redux';
import * as types from './types';
import { ProductsState } from './types';

const initialState: ProductsState = {
  paginationData: {
    data: [],
    count: 0,
    total: 0,
    pageCount: 0,
    page: 1,
  },
  isAllFetching: true,
  isItemFetching: false,
  currentItem: {},
  cartItems: [],
};

export default function productReducer(state = initialState, action: Action) {
  switch (action.type) {
    case types.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isAllFetching: true,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        paginationData: action.payload,
        isAllFetching: false,
      };
    case types.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isAllFetching: false,
      };

    case types.GET_PRODUCT_ITEM_REQUEST:
      return {
        ...state,
        isItemFetching: true,
      };
    case types.GET_PRODUCT_ITEM_SUCCESS:
      return {
        ...state,
        currentItem: action.payload,
        isItemFetching: false,
      };
    case types.GET_PRODUCT_ITEM_FAILURE:
      return {
        ...state,
        isItemFetching: false,
      };
    case types.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case types.ADD_PRODUCT_TO_CART_BUNCH:
      return {
        ...state,
        cartItems: [...action.payload],
      }
    default:
      return state;
  }
}
