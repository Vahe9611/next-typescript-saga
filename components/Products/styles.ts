import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const productsList = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(4, 0)
    },
    control: {
      padding: theme.spacing(2),
    },
    load_more: {
      marginTop: theme.spacing(4),
    },
    progress: {
      marginTop: theme.spacing(8),
    },
  }),
);

export const productView = makeStyles((theme: Theme) =>
  createStyles({
    sizes: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    }
  })
);

export const productListItem = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        '&:hover': {
          cursor: 'pointer',
          boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        },
      },
      image_wrapper: {
        width: '100%',
        height: '50%',
      },
      image: {
        width: '100%',
        height: 'auto',
      },
      padding: {
        padding: theme.spacing(3),
      },
      flex: {
        display: 'flex',
      },
      sizes: {
        '& > *': {
          marginRight: theme.spacing(1),
        },
      },
      footer: {
        padding: theme.spacing(3),
        display: 'flex',
        justifyContent: 'space-between',
      },
    }),
);
