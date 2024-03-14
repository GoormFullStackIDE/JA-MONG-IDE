import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  ListItemIcon,
  ListItemText,
  Collapse,
  Breadcrumbs,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import GroupsIcon from '@mui/icons-material/Groups';

function MainListItems() {
  return (
    // <List component="nav">
    <div>
      <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>아이콘</ListItemIcon>
          <ListItemText primary="" />
        </ListItemButton>
      </Link>
      <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>아이콘</ListItemIcon>
          <ListItemText primary="" />
        </ListItemButton>
      </Link>
    </div>
    //   <Divider sx={{ my: 1 }} />
    // </List>
  );
}
export default MainListItems;
