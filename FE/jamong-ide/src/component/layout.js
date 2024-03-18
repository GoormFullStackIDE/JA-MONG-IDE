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
} from '@mui/material';
import { showAlert, closeRedirectAlert } from '../common/confirmAlert.js';

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

  function alertClose() {
    const payload = {
      open: false,
    };
    return dispatch(showAlert(payload));
  }

  function redirectClose() {
    console.log(alert.path);
    navigate(alert.path);
    dispatch(closeRedirectAlert());
  }

  function redirectClose() {
    console.log(alert.path);
    navigate(alert.path);
    dispatch(closeRedirectAlert());
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {pathname === '/signup' ? (
        <></>
      ) : pathname === '/login' ? (
        <></>
      ) : (
        <Header setOpen={setOpen} open={open} />
      )}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: open ? drawerWidth : 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 0,
            boxSizing: 'border-box',
          },
        }}
        open={open}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: [1],
            backgroundColor: '#FFF7F4',
          }}
        >
          <Typography
            edge="start"
            variant="h6"
            color="primary"
            component="div"
            marginLeft={1}
          ></Typography>
        </Toolbar>
        <List
          component="nav"
          sx={{
            backgroundColor: '#FFF7F4',
          }}
        >
          <MainListItems />
          <Divider />
        </List>
      </Drawer>

      {/* main div */}
      <Box
        component="main"
        sx={{
          backgroundColor: '#FFFDFB',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />

        <div className="container_box_01">
          <Router />
        </div>
      </Box>
      <Dialog
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
            onClick={alert.path !== '' ? redirectClose : alertClose}
            autoFocus
          >
            {' '}
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default Layout;
