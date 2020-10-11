import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Product } from '@/types/product';
import { baseStyles } from '@/styles/main';
import Button from '@material-ui/core/Button';
import AddBox from '@material-ui/icons/Add';
import { unescapeHTML } from '@/utils/html';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { productView as productViewStyles } from './styles';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/modules/product/actions';

export interface ProductViewProps {
  data: Product;
}

const ProductView: React.FC<ProductViewProps> = ({ data }) => {
  const classes = baseStyles();
  const productStyles = productViewStyles();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState<null | string | number>(
    null,
  );

  const onSelectSize = useCallback((_, value: string) => {
    setSelectedSize(value);
  }, []);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(data));
  }, [dispatch, data]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <img className={classes.image} src={data.image} alt={data.name} />
      </Grid>
      <Grid item xs={6}>
        <div>
          <Typography>{data?.name}</Typography>
          <div
            dangerouslySetInnerHTML={{
              __html: unescapeHTML(data?.description),
            }}
          />
        </div>
        <div className={productStyles.sizes}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Gender</FormLabel>
            <RadioGroup
              row={true}
              aria-label='gender'
              name='gender1'
              value={selectedSize}
              onChange={onSelectSize}
            >
              {data?.sizes?.map((i: string) => (
                <FormControlLabel
                  key={i}
                  value={i}
                  control={<Radio />}
                  label={i}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <Grid container justify='center'>
          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<AddBox />}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductView;
