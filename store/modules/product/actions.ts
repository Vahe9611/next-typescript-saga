import * as types from './types';
import { Product } from '@/types/product';

export const getProducts = (payload: any) => ({
  type: types.GET_PRODUCTS_REQUEST,
  payload,
});

export const getProduct = (id: number) => ({
  type: types.GET_PRODUCT_ITEM_REQUEST,
  payload: id,
});

export const addToCart = (product: Product) => ({
  type: types.ADD_PRODUCT_TO_CART,
  payload: product,
});

export const addToCartBunch = (products: any) => ({
  type: types.ADD_PRODUCT_TO_CART_BUNCH,
  payload: products,
});
