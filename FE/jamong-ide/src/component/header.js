import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Login, Logout } from '../common/memberReducer.js';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';

export default function Header(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const member = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const isDisabled = member.authenticated;

  const colorTheme = createTheme({
    palette: {
      primary: {
        main: '#FFEBE5',
      },
    },
  });

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
        },
      },
    },
  });
  const toggleDrawer = () => {
    props.setOpen(!open);
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={colorTheme}>
      <AppBar position="fixed" color="primary" open={open}>
        <Toolbar theme={mediaTheme}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
            disabled={!isDisabled}
          >
            {/* 로그인시에만 메뉴버튼 활성화  */}
            {isDisabled ? <MenuIcon /> : <></>}
          </IconButton>

          <div className="header_logobox">
            <Link to="/">
              <img
                className="jamonglogo"
                src="/images/jamingIdeLogo.png"
                alt="jamongLogo"
              />
            </Link>
          </div>

          {isDisabled ? (
            // <Stack spacing={1} direction="row">

            <Avatar
              sx={{ width: 51, height: 51, mt: -0.1, ml: -0.8 }}
              alt="jamong.png"
              src="/images/jamong.png"
            />
          ) : (
            // </Stack>
            <Stack spacing={2} direction="row">
              {/* 로그인시 비활성화 */}
              <Button variant="contained" onClick={() => navigate('/login')}>
                로그인
              </Button>
              <Button variant="contained" onClick={() => navigate('/signup')}>
                회원가입
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
