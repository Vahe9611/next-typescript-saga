import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NextLink from 'next/link';
import Badge from '@material-ui/core/Badge';

import { defaultLayout } from '@/styles/main';
import { useSelector } from 'react-redux';
import { cartItemsSelector } from '@/store/modules/product/selectors';

interface Props {
  children: React.ReactChild | React.ReactChildren;
}

export default function DefaultLayout({ children }: Props) {
  const classes = defaultLayout();
  const cartItems = useSelector(cartItemsSelector);
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <NextLink href='/'>
            <Typography component='a' variant='h6' className={classes.title}>
              Shop
            </Typography>
          </NextLink>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <Badge badgeContent={cartItems?.length} color='primary'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </div>
  );
}
