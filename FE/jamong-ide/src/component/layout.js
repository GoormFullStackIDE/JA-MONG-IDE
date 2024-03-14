import React, { useState } from 'react';
import Header from '../component/header.js';
import Router from '../common/router.js';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MainListItems from './mainListItems';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

function Layout() {
  const [open, setOpen] = useState(false);

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

  return (
    <Box sx={{ display: 'flex' }}>
      <Header setOpen={setOpen} open={open} />
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
          backgroundColor: '##FFFDFB',
          flexGrow: 1,
          //   height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />

        <div className="container_box_01">
          <Router />
        </div>
      </Box>
    </Box>
  );
}
export default Layout;
