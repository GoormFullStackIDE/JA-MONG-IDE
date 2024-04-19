import React, { useState, useEffect } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import accessTokenApi from '../common/tokenApi';
import { Logout } from '../common/memberReducer.js';
import removeCookieToken, {
  removeAccessToken,
  getAccessToken,
  getCookieToken,
} from '../common/cookieStorage.js';
import { Login } from '../common/memberReducer';

import axios from 'axios';

const initMemberInfo = { name: '', email: '', file: '' };

function MainListItems() {
  const [isSpaceListOpen, setIsSpaceListOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);
  const [memberInfo, setMemberInfo] = useState(initMemberInfo);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const toggleSpaceList = () => {
    setIsSpaceListOpen(!isSpaceListOpen);
  };

  useEffect(() => {
    setAccessToken(getAccessToken());
    setRefreshToken(getCookieToken());

    //소셜로 회원가입시 리프레쉬 토큰만 들어온다.
    //소셜로 로그인시 둘다 들어와요
    if (accessToken && refreshToken) {
      socialLogin();
    }
    if (member.token !== null) {
      infoGet();
    }

    function socialLogin() {
      if (accessToken) {
        const payload = {
          authenticated: true,
          token: accessToken,
        };
        dispatch(Login(payload));
      }
    }
  }, [accessToken]);

  const logoutDispatch = () => {
    const payload = { authenticated: false, token: null, expireTime: null };
    dispatch(Logout(payload));
  };

  const goLogout = () => {
    removeCookieToken();
    localStorage.clear();
    // removeAccessToken();
    logoutDispatch();
    window.location.replace('/');
  };

  //소셜로 회원가입시 리프레쉬 토큰만 들어온다.
  //소셜로 로그인시 둘다 들어와요

  async function infoGet() {
    try {
      const data = await accessTokenApi.get('jamong/member/info', {
        headers: {
          Authorization: member.token,
        },
      });
      setMemberInfo({
        name: data.data[0].memberName,
        email: data.data[0].memberEmail,
        file: data.data[0].memberFile,
      });
      localStorage.setItem('memberIdMail', data.data[0].memberEmail);
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
  // 소셜 로그인은 쿠키에 액세스토큰이 있으면 불러와서 디스패치 해줘야한다.
  // 회원가입여부했을땐 리프레쉬토큰이
  // const socialJoin = () => {
  //   if (
  //     (accessToken === '' || accessToken === undefined) &&
  //     refreshToken !== ''
  //   ) {
  //     const payload = {
  //       text: '소셜 회원가입이 완료되었습니다. 다시 로그인 해주시기 바랍니다.',
  //       open: true,
  //     };
  //     dispatch(showAlert(payload));
  //   }
  // };

  //로그아웃 만들기 리프레쉬액세스토큰 둘다 지워야함,
  //이름,이메일, 이미지 파일 가져와서 뿌려주기
  const moveContainer = () => {};

  return (
    <div>
      <div className="list_profile">
        {memberInfo.file === null ? (
          <Avatar
            sx={{
              margin: 1,
              width: 100,
              height: 100,
              backgroundColor: '#FFF7F4',
            }}
            alt="profile_picture"
            src="/images/jamong.png"
          />
        ) : (
          <Avatar
            sx={{
              margin: 1,
              width: 100,
              height: 100,
              backgroundColor: '#fffdfb',
            }}
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
          <button
            className="profile_btn"
            onClick={() => {
              goLogout();
              removeAccessToken();
            }}
          >
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
          <button
            className="listbtn"
            onClick={() => navigate('/container', { state: 'all' })}
          >
            모든 컨테이너
          </button>
          <button
            className="listbtn"
            onClick={() => navigate('/container', { state: 'my' })}
          >
            내 컨테이너
          </button>
          <button
            className="listbtn"
            onClick={() => navigate('/container', { state: 'shared' })}
          >
            공유받은 컨테이너
          </button>
        </div>
      )}
    </div>
  );
}

export default MainListItems;
