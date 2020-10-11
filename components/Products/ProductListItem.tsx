import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Product } from '@/types/product';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NextLink from 'next/link';
import Button from '@material-ui/core/Button';
import cslx from 'clsx';

import { productListItem as useStyles } from './styles';

export interface ProductListItemProps {
  data: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <NextLink href='/[productId]' as={`/${data.id}`}>
      <Paper className={classes.paper}>
        <div className={classes.image_wrapper}>
          <img
            src={data?.image}
            alt={data?.name}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div className={cslx(classes.flex, classes.padding)}>
          <div>
            <Typography variant='subtitle1' color='textPrimary'>
              {data.name}
            </Typography>
          </div>
          <div>
            <Typography color='secondary'>{data?.price}$</Typography>
          </div>
        </div>
        <div className={classes.footer}>
          <div>
            <Typography color='secondary'>Sizes:</Typography>
            <div className={cslx(classes.flex, classes.sizes)}>
              {data?.sizes.map((size: string) => (
                <Typography key={size} color='textSecondary'>
                  {size}
                </Typography>
              ))}
            </div>
          </div>

          <Button
            variant='contained'
            color='secondary'
            endIcon={<VisibilityIcon />}
          >
            View
          </Button>
        </div>
      </Paper>
    </NextLink>
  );
};

export default ProductListItem;
