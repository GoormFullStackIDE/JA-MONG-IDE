import React, { useState } from 'react';
import Header from '../component/header.js';
import Router from '../common/router.js';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MainListItems from './mainListItems';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ThemeProvider,
} from '@mui/material';
import { showAlert, closeRedirectAlert } from '../common/confirmAlert.js';
import { createTheme } from '@mui/material/styles';

function Layout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const alert = useSelector((state) => state.alert);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drawerWidth = 230;

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      height: '100vh',
      zIndex: 1000,
      backgroundColor: '#fff7f4',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      // elevation: '100%',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));
  //.css-1f6g6xq-MuiToolbar-root
  const mediaTheme = createTheme({
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            height: '55px',
            minHeight: '55px',
            '@media (min-width: 600px)': {
              minHeight: '50px',
            },
          },
          gutters: {
            height: '55px',
            minHeight: '55px',
            '@media (min-width: 600px)': {
              minHeight: '50px',
            },
          },
          regular: {
            height: '55px',
            minHeight: '55px',
            '@media (min-width: 600px)': {
              minHeight: '50px',
            },
          },
        },
      },
    },
  });

  //.css-1t1j96h-MuiPaper-root-MuiDialog-paper
  const alertTheme = createTheme({
    palette: {
      primary: {
        main: '#FFF7F4',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            color: '#FFAE8C',
            backgroundColor: '#FFF7F4',
          },
        },
      },
    },
  });

  //#FFAE8C
  //.css-1w1rijm-MuiButtonBase-root-MuiButton-root
  const btnTheme = createTheme({
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'pink' },
            style: {
              textTransform: 'none',
              borderColor: '#999999',
              color: '#FFAE8C',
            },
          },
        ],
      },
    },
  });

  function alertClose() {
    const payload = {
      open: false,
    };
    return dispatch(showAlert(payload));
  }

  function redirectClose() {
    navigate(alert.path);
    dispatch(closeRedirectAlert());
  }

  function redirectClose() {
    navigate(alert.path);
    dispatch(closeRedirectAlert());
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {pathname === '/signup' ? (
        <></>
      ) : pathname === '/findpassword' ? (
        <></>
      ) : pathname === '/findid' ? (
        <></>
      ) : pathname === '/login' ? (
        <></>
      ) : (
        <>
          <Header setOpen={setOpen} open={open} />

          <Drawer
            variant="permanent"
            sx={{
              width: open ? drawerWidth : 0,
              flexShrink: open ? drawerWidth : 0,
              '& .MuiDrawer-paper': {
                width: open ? drawerWidth : 0,
                boxSizing: 'border-box',
                height: '100%',
                overflow: 'hidden',
              },
            }}
            open={open}
          >
            <Toolbar theme={mediaTheme}>
              <Typography
                edge="start"
                variant="h6"
                color="primary"
                component="div"
                marginLeft={1}
              >
                ?
              </Typography>
            </Toolbar>
            <List
              component="nav"
              sx={{
                backgroundColor: '#FFF7F4',
                padding: '0px',
              }}
            >
              <MainListItems />
              <Divider />
            </List>
          </Drawer>
        </>
      )}
      {/* main div */}
      <Box
        component="main"
        sx={{
          backgroundColor: '#FFFDFB',
          flexGrow: 1,
          // height: '100%',
          overflow: 'visible',
          mt: '55px',
        }}
      >
        {/* <Toolbar theme={mediaTheme} /> */}

        <div className="container_box_01">
          <Router />
        </div>
      </Box>

      <ThemeProvider theme={alertTheme}>
        <Dialog
          backgroundColor="#FFF7F4"
          open={alert.open}
          onClose={alertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // PaperComponent={{ backgroundColor: '#FFF7F4' }}
          // classes={{ backgroundColor: '#FFF7F4' }}
        >
          <DialogTitle id="alert-dialog-title">{alert.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alert.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="pink"
              onClick={alert.path !== '' ? redirectClose : alertClose}
              autoFocus
            >
              {' '}
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Box>
  );
}
export default Layout;
