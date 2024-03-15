import React, { useState } from 'react';

function LoginPage() {
  return (
    <div id="login">
      <div className="logo_img_box">
        <img src="/images/jamingIdeLogo.png" alt="jamongLogo" />
      </div>
      <div className="login_box">
        <div className="login_box_01">
          <input className="input_login_00" placeholder="이메일"></input>
          <input className="input_login_00" placeholder="비밀번호"></input>
          <button className="login_button_01 button_gradient">로그인</button>
          <div className="login_button_box_01">
            <button className="login_button_02">아이디 찾기</button>
            <button className="login_button_02">비밀번호 찾기</button>
            <button className="login_button_02"></button>
            <button className="login_button_02">회원가입</button>
          </div>
          <hr className="divider" />
        </div>
        <div className="social_login_box01">
          <button className="social_googlebtn">구글로 로그인</button>
          <button className="social_naverbtn">네이버로 로그인</button>
          <button className="social_kakaobtn">카카오로 로그인</button>
          <button className="social_githubbtn">깃허브로 로그인</button>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
