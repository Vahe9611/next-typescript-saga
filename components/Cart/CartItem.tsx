import React from 'react';
import NumberCounter from '@/components/Cart/NumberCounter'
import DeleteIcon from '@material-ui/icons/Delete';
import { Product } from '@/types/product';
import {
  IconButton,
  Typography,
  Divider,
  Box
} from '@material-ui/core';

import { unescapeHTML } from '@/utils/html';


export interface CartItemProps extends Product {
  onRemove: () => void;
  onChangeCount?: (varaint: 'increment' | 'decrement') => void;
}

const CartItem: React.FC<CartItemProps> = ({size, name, description, price, count, onRemove, onChangeCount}) => {
  return (
    <React.Fragment>
      <Box px={2} py={1}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h5' noWrap color='secondary'>{name}</Typography>
          <Box ml={3}>
            <IconButton onClick={onRemove} edge='start' color='secondary' aria-label='remove'>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Box 
            dangerouslySetInnerHTML={{
              __html: unescapeHTML(description),
            }}
          /> 
          <Typography 
            variant='button' 
            noWrap
          > 
            Size: {size}
          </Typography>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mt={1}
          >
            <Box
              display='flex'
              alignItems='center'
            >
              <NumberCounter onChange={onChangeCount} count={count}/>
            </Box>
            <Typography variant="h5">{price}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider variant='middle' light/>
    </React.Fragment>
  );
};

CartItem.defaultProps = {
  name: '',
  description: '',
  price: '',
  count: 0
}

export default CartItem;
