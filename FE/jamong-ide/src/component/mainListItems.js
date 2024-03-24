import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemIcon, List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import accessTokenApi from '../common/tokenApi';
import { Logout } from '../common/memberReducer.js';
import removeCookieToken from '../common/cookieStorage.js';
import axios from 'axios';

const initMemberInfo = { name: '', email: '', file: '' };

function MainListItems() {
  const [isSpaceListOpen, setIsSpaceListOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const member = useSelector((state) => state.member);
  const [memberInfo, setMemberInfo] = useState(initMemberInfo);

  const toggleSpaceList = () => {
    setIsSpaceListOpen(!isSpaceListOpen);
  };

  useEffect(() => {
    infoGet();
    console.log(memberInfo);
  }, []);

  const goLogout = () => {
    dispatch(Logout());
    removeCookieToken();
    localStorage.clear();
    navigate('/');
  };

  async function infoGet() {
    try {
      const data = await accessTokenApi.get('jamong/member/info', {
        headers: {
          Authorization: member.token,
        },
      });
      console.log(data.data[0]);
      setMemberInfo({
        name: data.data[0].memberName,
        email: data.data[0].memberEmail,
        file: data.data[0].memberFile,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          //404 : refreshToken로 한 accessToken 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
          //422 : 요청하는 api의 파라미터에 대한 validation 문제로 (좀 더 정확히는 response Model) 요청실패
          error.response?.status === 403
        ) {
        }
      }
    }
  }
  //로그아웃 만들기 리프레쉬액세스토큰 둘다 지워야함,
  //이름,이메일, 이미지 파일 가져와서 뿌려주기
  const moveContainer = () => {};

  return (
    <div>
      <div className="list_profile">
        {/* <Avatar
          sx={{ mt: 1, width: 100, height: 100, backgroundColor: '#fffdfb' }}
          alt="jamong.png"
          src="/images/jamong.png"
        /> */}
        {memberInfo.file === null ? (
          <Avatar
            sx={{
              mt: 1,
              width: 100,
              height: 100,
              backgroundColor: '#FFF7F4',
            }}
            alt="profile_picture"
            src="/images/jamong.png"
          />
        ) : (
          <Avatar
            sx={{ mt: 1, width: 100, height: 100, backgroundColor: '#fffdfb' }}
            alt="jamong.png"
            src={memberInfo.file}
          />
        )}
        <p className="list_name">{memberInfo.name}</p>
        <p className="list_email">{memberInfo.email}</p>
        <div className="profile_btn_box">
          <button className="profile_btn" onClick={() => navigate('/profile')}>
            프로필 편집
          </button>
          <button className="profile_btn" onClick={goLogout}>
            로그아웃
          </button>
        </div>
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
          <button className="listbtn" onClick={() => navigate('/container')}>
            모든 컨테이너
          </button>
          <button className="listbtn">내 컨테이너</button>
          <button className="listbtn">공유받은 컨테이너</button>
        </div>
      )}
    </div>
  );
}

export default MainListItems;
