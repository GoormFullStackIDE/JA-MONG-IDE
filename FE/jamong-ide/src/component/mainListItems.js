import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import {
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '../component/mainListItems.css';


function MainListItems() {
  const [isSpaceListOpen, setIsSpaceListOpen] = useState(false);

  const toggleSpaceList = () => {
    setIsSpaceListOpen(!isSpaceListOpen);
  };

  return (
    <div>
      <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <div className='list_profile'>
              <p className='list_name'>김이름</p>
              <p className='list_email'>example@mail.com</p>
            </div>
          </ListItemIcon>
          <ListItemText primary="" />
        </ListItemButton>
      </Link>
      <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <p className='alarm'>알림</p>
          </ListItemIcon>
          <ListItemText primary="" />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={toggleSpaceList} style={{display: 'flex', alignItems: 'center'}}>
        <div className='space'>
          <p>스페이스</p>
          {isSpaceListOpen ? (
            <div className="arrow-up" />
          ) : (
            <div className="arrow-down" />
          )}
        </div>
      </ListItemButton>
      {isSpaceListOpen && (
        <div className='space_list'>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            <p>모든 컨테이너</p>
          </Link>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            <p>내 컨테이너</p>
          </Link>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            <p>공유받은 컨테이너</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MainListItems;