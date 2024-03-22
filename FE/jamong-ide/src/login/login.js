import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Config from '../common/config';
import { showAlert } from '../common/confirmAlert';
import { useDispatch } from 'react-redux';
import { setRefreshToken } from '../common/cookieStorage.js';
import { Login } from '../common/memberReducer';
import { TokenContext } from '../common/tokenContext';

const initLoginInfo = {
  memberIdEmail: '',
  memberPass: '',
};
// const [loginInfo, setLoginInfo] = useState(initLoginInfo);

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState(initLoginInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToken } = useContext(TokenContext);

  function memberChanged(infoName, e) {
    const member = { ...loginInfo };
    member[infoName] = e.target.value;
    setLoginInfo(member);
    console.log(loginInfo);
  }

  async function goLogin() {
    if (loginInfo.memberIdEmail === '') {
      const payload = {
        text: '아이디를 입력해 주세요.',
        open: true,
      };
      dispatch(showAlert(payload));
    }
    if (loginInfo.memberPass === '') {
      const payload = {
        text: '비밀번호를 입력해 주세요.',
        open: true,
      };
      dispatch(showAlert(payload));
    }
    const memberLogin = await axios({
      method: 'post',
      url: encodeURI(Config.API_SERVER + 'jamong/member/login'),
      data: loginInfo,
    });
    console.log(memberLogin);
    try {
      //헤더에 액세스 토큰 저장 = 이거 새로고침하면 없어짐...ㅠㅠ
      // axios.defaults.headers.common[
      //   'Authorization'
      // ] = `Bearer ${memberLogin.headers.authorization}`;
      setToken(memberLogin.headers.authorization);

      //쿠키에 리프레쉬 토큰 저장
      setRefreshToken();
      console.log('setRefreshToken', setRefreshToken);

      const payload = {
        authenticated: true,
        token: memberLogin.headers.authorization,
      };
      dispatch(Login(payload));

      navigate('/');
    } catch (error) {
      if (memberLogin.data.message !== 'Success') {
        const payload = {
          text: '일치하는 회원정보가 없습니다. 다시 시도하여 주시기 바랍니다.',
          open: true,
        };
        dispatch(showAlert(payload));
      }
    }

    //헤더에 axios.defaults.headers.common.Authorization 디폴트로 저장해서 담아놓는다. = ????
    //쿠키에 refresh토큰이 담겨있으니 인터셉터하는 변수만 만들면된다. 그럼 보낼때마다 토큰이 만료되었는지 확인을 해야하는가?
    //ㄴㄴ 쿠키에있는 refreshtoken도 가져와서 인터셉트하는 함수에 붙여서 보내 액세스토큰을 새로 받아와야한다.
  }

  return (
    <div id="login">
      <div className="logo_img_box">
        <img src="/images/jamingIdeLogo.png" alt="jamongLogo" />
      </div>
      <div className="login_box">
        <div className="login_box_01">
          <input
            className="input_login_00"
            placeholder="이메일"
            name="email"
            id="email"
            maxLength="49"
            value={loginInfo['memberIdEmail']}
            onChange={(e) => memberChanged('memberIdEmail', e)}
          ></input>
          <input
            className="input_login_00"
            placeholder="비밀번호"
            type="password"
            name="password"
            id="password"
            value={loginInfo['memberPass']}
            onChange={(e) => memberChanged('memberPass', e)}
          ></input>
          <button
            className="login_button_01 button_gradient"
            onClick={() => goLogin()}
          >
            로그인
          </button>
          <div className="login_button_box_01">
            <button
              className="login_button_02"
              onClick={() => navigate('/findid')}
            >
              아이디 찾기
            </button>
            <button
              className="login_button_02"
              onClick={() => navigate('/FindPasswordPage')}
            >
              비밀번호 찾기
            </button>
            <button className="login_button_02"></button>
            <button
              className="login_button_02"
              onClick={() => navigate('/signup')}
            >
              회원가입
            </button>
          </div>
          <hr className="divider" />
        </div>
        <div className="social_login_box01">
          <button
            className="social_googlebtn"
            onclick="location.href='http://localhost:8088/jamong/member/login/google'"
          >
            구글로 로그인
          </button>
          <button
            className="social_naverbtn"
            onclick="location.href='http://localhost:8088/jamong/member/login/naver'"
          >
            네이버로 로그인
          </button>
          <button
            className="social_kakaobtn"
            onclick="location.href='http://localhost:8088/jamong/member/login/kakao'"
          >
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
