import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

export default function Header(props) {
  const [open, setOpen] = useState(false);

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
    // <Box sx={{ flexGrow: 1 }}>
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
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            JA:MONG
          </Typography>
          <Stack spacing={2} direction="row">
            {/* 로그인시 비활성화 */}
            <Button variant="contained">로그인</Button>
            <Button variant="contained">회원가입</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
    // </Box>
  );
}
