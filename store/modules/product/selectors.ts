import { RootStateOrAny } from 'react-redux';

export const productsPaginationSelector = (state: RootStateOrAny) => state.products.paginationData;
export const productSelector = (state: RootStateOrAny) => state.products.currentItem;

export const isAllFetchingSelector = (state: RootStateOrAny) => state.products.isAllFetching;
export const isItemFetchingSelector = (state: RootStateOrAny) => state.products.isItemFetching;
export const cartItemsSelector = (state: RootStateOrAny) => state.products.cartItems;