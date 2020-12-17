import { PaginationResponse } from '@/interfaces/api';
import { Product } from '@/types/product';

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const GET_PRODUCT_ITEM_REQUEST = 'GET_PRODUCT_ITEM_REQUEST';
export const GET_PRODUCT_ITEM_SUCCESS = 'GET_PRODUCT_ITEM_SUCCESS';
export const GET_PRODUCT_ITEM_FAILURE = 'GET_PRODUCT_ITEM_FAILURE';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const ADD_PRODUCT_TO_CART_BUNCH = 'ADD_PRODUCT_TO_CART_BUNCH';

export type ProductsState = {
  paginationData: PaginationResponse;
  isAllFetching: boolean;
  isItemFetching: boolean;
  currentItem: Product | {};
  cartItems: Array<Product>;
}
