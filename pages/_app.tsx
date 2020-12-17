import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '@/utils/theme';

import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { wrapper } from '../store';

import { useDispatch, useSelector } from 'react-redux';
import { cartItemsSelector } from '@/store/modules/product/selectors';
import { addToCartBunch } from '@/store/modules/product/actions';

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector<HTMLInputElement>(
      '#jss-server-side',
    );
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    let currentOrder = localStorage.getItem("current_order");

    if (currentOrder === null) return;
    
    dispatch(addToCartBunch(JSON.parse(currentOrder)))
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('current_order', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <>
      <Head>
        <title>Lesson Web</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(App);
