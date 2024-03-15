import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const colorTheme = createTheme({
    palette: {
      primary: {
        main: '#FFEBE5',
      },
    },
  });
  const toggleDrawer = () => {
    props.setOpen(!open);
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={colorTheme}>
      <AppBar position="absolute" color="primary" open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            {/* 로그인시에만 버튼 활성화  */}
            <MenuIcon />
          </IconButton>
          <div className="header_logobox">
            <img
              className="jamonglogo"
              src="/images/jamingIdeLogo.png"
              alt="jamongLogo"
            />
          </div>
          {/* <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            JA:MONG
          </Typography> */}
          <Stack spacing={2} direction="row">
            {/* 로그인시 비활성화 */}
            <Button variant="contained" onClick={() => navigate('/login')}>
              로그인
            </Button>
            <Button variant="contained" onClick={() => navigate('/signup')}>
              회원가입
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
