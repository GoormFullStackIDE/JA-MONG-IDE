import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  return (
    <div className="mainpage_container">
      <div className="main_box1">
        <p>
          자몽 IDE에 오신 것을
          <br /> 환영합니다!
        </p>
        <button className="main_startbtn" onClick={() => navigate('/signup')}>
          시작하기
        </button>
      </div>
      <img className="mainimg" src="/images/mainscreen.jpg" alt="mainscreen" />
    </div>
  );
}
export default Main;
