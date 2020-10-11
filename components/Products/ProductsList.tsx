import React, { useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import ProductListItem from '@/components/Products/ProductListItem';
import { Product } from '@/types/product';
import { useDispatch, useSelector } from 'react-redux';
import { isAllFetchingSelector, productsPaginationSelector } from '@/store/modules/product/selectors';
import { getProducts } from '@/store/modules/product/actions';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { productsList as useStyles } from './styles';

export interface ProductsListProps {
  list?: Array<Product>
}

const ProductsList: React.FC<ProductsListProps> = () => {
  const classes = useStyles();
  const { data, pageCount, page }: any = useSelector(productsPaginationSelector);
  const loading = useSelector(isAllFetchingSelector);

  const dispatch = useDispatch();

  const onChange = useCallback((_, page: number) => {
    dispatch(getProducts({ page }));
  }, [dispatch]);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        { loading ? (
            <Grid container={true} justify='center'>
              <Grid item className={classes.progress}>
                <CircularProgress />
              </Grid>
            </Grid>
        ) : (
          <>
            <Grid container justify='flex-start' spacing={3}>
              {data.map((product: any) => (
                <Grid key={product.id} item xs={4} lg={3}>
                  <ProductListItem data={product} />
                </Grid>
              ))}
            </Grid>
            <Grid container={true} justify='center'>
              <Grid item className={classes.load_more}>
                <Pagination count={pageCount} color='primary' onChange={onChange} page={page} />
              </Grid>
            </Grid>
          </>
        ) }
      </Grid>
    </Grid>
  );
};

export default ProductsList;
