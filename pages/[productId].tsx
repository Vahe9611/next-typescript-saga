import React from 'react';
import Layout from '@/layouts/DefaultLayout';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ProductView from '@/components/Products/ProductView';
import { wrapper } from '@/store/index';
import { getProduct } from '@/store/modules/product/actions';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import { isItemFetchingSelector, productSelector } from '@/store/modules/product/selectors';
import ProductsApi from '@/libs/api/products';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface ProductViewPageProps {}

const api = new ProductsApi();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
      flexGrow: 1,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

const ProductViewPage: React.FC<ProductViewPageProps> = () => {
  const classes = useStyles();
  const product = useSelector(productSelector);
  const loading = useSelector(isItemFetchingSelector);
  return (
    <Layout>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center'>
            {loading ? (
              <Grid item>
                <CircularProgress />
              </Grid>
            ) : (
              <Grid item xs={6}>
                <ProductView data={product} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};


export const getStaticProps = wrapper.getStaticProps(async ({ store, params}) => {
  if (params) {
    const { productId } = params;
    if (productId) {
      store.dispatch(getProduct(Number(productId)));
      store.dispatch(END);
    }
  }
  await store.sagaTask?.toPromise();
});

export async function getStaticPaths() {
  const { data: { data } } = await api.list({});
  const paths = data.map((item: any) => `/${item.id}`)
  return { paths, fallback: false }
}

export default ProductViewPage;
