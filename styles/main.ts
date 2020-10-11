import { makeStyles } from '@material-ui/core/styles';

export const defaultLayout = makeStyles((theme: any) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      backgroundColor: 'transparent',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      borderRadius: '10px',
      backgroundColor: 'transparent',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  title: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  appBar: {
    flexDirection: 'row',
    zIndex: theme.zIndex.drawer - 1,
    width: '100%',
    background: '#fff',
    boxShadow: '2px 4px 20px -4px rgba(0,0,0,.1)',
    [theme.breakpoints.up('sm')]: {
      minHeight: theme.spacing(7),
    },
  },
  toolbar: {
    justifyContent: 'space-between',
  },
}));

export const baseStyles = makeStyles({
  image: {
    width: '100%',
    height: 'auto',
  },
});
