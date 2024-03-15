import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemIcon, ListItemText } from '@mui/material';

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
            <div className="list_profile">
              <p className="list_name">김이름</p>
              <p className="list_email">example@mail.com</p>
            </div>
          </ListItemIcon>
          <ListItemText primary="" />
        </ListItemButton>
      </Link>
      <ListItemButton
        onClick={toggleSpaceList}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div className="space">
          <p>스페이스</p>
          {isSpaceListOpen ? (
            <div className="arrow-up" />
          ) : (
            <div className="arrow-down" />
          )}
        </div>
      </ListItemButton>
      {isSpaceListOpen && (
        <div className="space_list">
          <h4 style={{ color: '#666666', textDecoration: 'none' }}>
            모든 컨테이너
          </h4>
          <h4 style={{ color: '#666666', textDecoration: 'none' }}>
            내 컨테이너
          </h4>
          <h4 style={{ color: '#666666', textDecoration: 'none' }}>
            공유받은 컨테이너
          </h4>
        </div>
      )}
    </div>
  );
}

export default MainListItems;
