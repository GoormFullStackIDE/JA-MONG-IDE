import React, { useState } from "react";

const ProfilePage = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleImageSelect = () => {
    console.log("이미지 선택 버튼 클릭됨");
    // 이미지 선택 버튼이 클릭되었을 때 수행할 동작 추가
  };

  const handleConfirm = () => {
    console.log("확인 버튼 클릭됨");
    // 확인 버튼이 클릭되었을 때 수행할 동작 추가
  };

  const handleAuthentication = () => {
    console.log("인증 버튼 클릭됨");
    // 인증 버튼이 클릭되었을 때 수행할 동작 추가
  };

  const handleInfoChange = () => {
    setPopupVisible(true); 
  };

  const handleClosePopup = () => {
    setPopupVisible(false); 
  };

  return (
    <div className="profile_box">
      <div className="pro_inner">
        <div className="picture_box">
          <p className="pro_pic"></p>
          <button className="p_select" onClick={handleImageSelect}>이미지 선택</button>
        </div>
        <ul className="pro_list">
          <li ><input className="list1" type="text" placeholder="이름" /></li>
          <li ><input className="list1" type="text" placeholder="이메일" /></li>
          <li ><input className="list1" type="text" placeholder="비밀번호 (영문 대소문자, 숫자 특수문자 8-16자)" /></li>
          <li ><input className="list1" type="text" placeholder="비밀번호 확인" /></li>
          <li ><input className="list1" type="text" placeholder="주소" /></li>
          <li ><input className="list2" type="text" placeholder="핸드폰" />
            <button className="pro_b" onClick={handleAuthentication}>인증</button>
          </li>
          <li><input className="list2" type="text" placeholder="인증번호" />
            <button className="pro_b" onClick={handleConfirm}>확인</button>
          </li>
        </ul>
      </div>
        <div className="info_change">
          <button onClick={handleInfoChange}>정보 변경</button>
        </div>
        {popupVisible && (
        <div className="popup">
          <div className="popup_content">
          <p>개인정보 변경이 완료되었습니다!</p>
          <button className="pop_ok" onClick={handleClosePopup}>확인</button>
          <button className="pop_close" onClick={handleClosePopup}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
