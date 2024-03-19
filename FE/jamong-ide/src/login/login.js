import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Config from '../common/config';
import { showAlert } from '../common/confirmAlert';
import { useDispatch } from 'react-redux';

const initLoginInfo = {
  memberIdEmail: '',
  memberPass: '',
};

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState(initLoginInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    if (memberLogin.data.message !== 'Success') {
      const payload = {
        text: '일치하는 회원정보가 없습니다. 다시 시도하여 주시기 바랍니다.',
        open: true,
      };
      dispatch(showAlert(payload));
    } else {
      console.log(memberLogin.data);
      console.log(memberLogin.headers.authorization);

      navigate('/');
    }
  }
  function socialLogin(name) {
    navigate(Config.API_SERVER + 'jamong/member/login/' + name);
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
            onClick={() => socialLogin('google')}
          >
            구글로 로그인
          </button>
          <button
            className="social_naverbtn"
            onClick={() => socialLogin('naver')}
          >
            <a href="http://localhost:8088/jamong/member/login/naver">
              네이버로 로그인
            </a>
          </button>
          <button
            className="social_kakaobtn"
            onClick={() => socialLogin('kakao')}
          >
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
