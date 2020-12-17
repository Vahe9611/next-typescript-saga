import React, {useState, useMemo, useCallback} from 'react';
import {
  Drawer,
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Badge,
  Box
} from '@material-ui/core';
import { Product } from '@/types/product';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import NextLink from 'next/link';
import currencyFormatter from 'currency-formatter'
import CartItem from '@/components/Cart/CartItem';

import { defaultLayout } from '@/styles/main';
import { useSelector, useDispatch } from 'react-redux';
import { cartItemsSelector } from '@/store/modules/product/selectors';
import { addToCartBunch } from '@/store/modules/product/actions';

import { groupByMultiple } from '@/utils/helpers'

interface Props {
  children: React.ReactChild | React.ReactChildren;
}

export default function DefaultLayout({ children }: Props) {
  const classes = defaultLayout();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open)
  };

  const totalAmout = useMemo(() => {
    let total = 0;

    for (let item of cartItems) {
      total += item.priceInCents
    }

    return currencyFormatter.format((total / 100), { code: 'USD' })
  }, [cartItems])

  const filteredItems: Array<Product> = useMemo(() => {
    return groupByMultiple(cartItems, (item: any) => ([item.id, item.size]))
          .map(products => ({...products[0], count: products.length}));
  }, [cartItems])

  const handleRemove = useCallback((order: any) => {
    const filteredItems = cartItems.filter((item: Product) => item.id !== order.id || item.size !== order.size);
    dispatch(addToCartBunch(filteredItems));
  }, [cartItems, dispatch])

  const handleChangeCount = useCallback((variant, product: Product) => {
    const arr = [...cartItems];
    if (variant === 'decrement') {
      const index = arr.findIndex((i: any) => i.id === product.id && i.size === product.size);
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
    if (variant === 'increment') {
      arr.push(product)
    }
    dispatch(addToCartBunch(arr));
  }, [cartItems, dispatch])
  
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <NextLink href='/'>
            <Typography component='a' variant='h6' className={classes.title}>
              Shop
            </Typography>
          </NextLink>
          <IconButton onClick={() => toggleDrawer(true)} edge='start' color='inherit' aria-label='menu'>
            <Badge badgeContent={filteredItems?.length} color='secondary'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Drawer
            anchor='right'
            open={openDrawer}
            transitionDuration={350}
            onClose={() => toggleDrawer(false)}
          >
            <Box
              display='flex'
              flexGrow={0}
              alignItems='center'
              justifyContent='space-between'
              py={1}
              px={2}
            >
              <IconButton onClick={() => toggleDrawer(false)} edge='start' color='inherit' aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">My Cart</Typography>
            </Box>
            <Box 
              height='100%'
              width={350}
              overflow='auto'
            >
              {
                filteredItems.map((item, index) => (
                  <CartItem
                    key={`${item.id}_${item.size}_${index}`}
                    onRemove={() => handleRemove(item)}
                    onChangeCount={variant => handleChangeCount(variant, item)}
                    {...item}
                  />
                ))
              }
            </Box>
            <Box
              zIndex="tooltip"
              width={350}
              boxShadow={2}
            >
              <Box
                display='flex'
                justifyContent='space-between'
                p={2}
                bgcolor='background.default'
              >
                <Typography variant='h5' noWrap color='secondary'>Total:</Typography>
                <Typography variant='h5' noWrap color='secondary'>{totalAmout}</Typography>
              </Box>
              <Button 
                fullWidth={true} 
                variant="contained" 
                color="secondary"
                size='large'
              >
                Оформить заказ
              </Button>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </div>
  );
}
