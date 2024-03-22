import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemIcon, List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
function MainListItems() {
  const [isSpaceListOpen, setIsSpaceListOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSpaceList = () => {
    setIsSpaceListOpen(!isSpaceListOpen);
  };

  const moveContainer = () => {};
  return (
    <div>
      <div className="list_profile">
        <Avatar
          sx={{ mt: 1, width: 100, height: 100 }}
          alt="jamong.png"
          src="/images/jamong.png"
        />
        <p className="list_name">김이름</p>
        <p className="list_email">sdfmple@mail.com</p>
      </div>

      <ListItemButton onClick={toggleSpaceList}>
        <div className="space">
          <p> 스페이스 </p>
          {isSpaceListOpen ? (
            <div className="arrow-up" />
          ) : (
            <div className="arrow-down" />
          )}
        </div>
      </ListItemButton>
      {isSpaceListOpen && (
        <div className="space_list">
          <button className="listbtn">모든 컨테이너</button>
          <button className="listbtn">내 컨테이너</button>
          <button className="listbtn">공유받은 컨테이너</button>
        </div>
      )}
    </div>
  );
}

export default MainListItems;
