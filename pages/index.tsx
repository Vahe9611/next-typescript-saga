import React from 'react';
import Layout from '@/layouts/DefaultLayout';
import ProductsList from '@/components/Products/ProductsList';
import { NextPage } from 'next';
import { wrapper } from '../store';
import { getProducts } from '@/store/modules/product/actions';
import { END } from 'redux-saga';
import { RootStateOrAny } from 'react-redux';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <ProductsList />
    </Layout>
  )
};

export const getStaticProps = wrapper.getStaticProps(async ({ store}) => {
  const { products }: RootStateOrAny = store.getState();
  store.dispatch(getProducts({ page: products.paginationData.page }));
  store.dispatch(END);
  await store.sagaTask?.toPromise();
});

export default HomePage;