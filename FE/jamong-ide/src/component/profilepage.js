import React, { useState } from "react";

const ProfilePage = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [infoChangePopupVisible, setInfoChangePopupVisible] = useState(false);

  const handleImageSelect = () => {
  };

  const handleConfirm = () => {
  };

  const handleAuthentication = () => {
  };

  const handleWithdrawal = () => {
    setConfirmationVisible(true); // 회원탈퇴 팝업 열기
  };
  const handleInfoChange = () => {
    setInfoChangePopupVisible(true); // 정보 변경 팝업
  };

  const handleConfirmYes = () => {
    setConfirmationVisible(false);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false); 
    setInfoChangePopupVisible(false);
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
        <div className="member_info">
          <button className="m_change" onClick={handleInfoChange}>정보 변경</button>
          <button className="m_cancel" onClick={handleWithdrawal}>회원 탈퇴</button>
        </div>
        {confirmationVisible && (
          <div className="popup">
          <div className="popup_content">
            <p> 자몽 IDE에서 탈퇴하시겠습니까?</p>
            <button className="pop_yes" onClick={handleConfirmYes}>확인</button>
            <button className="pop_no" onClick={() => setConfirmationVisible(false)}>취소</button>
          </div>
        </div>
        )}
        {infoChangePopupVisible && (
          <div className="popup">
            <div className="popup_content">
              <p>개인정보 변경이 완료되었습니다.</p>
              <button className="pop_ok" onClick={handleClosePopup}>확인</button>
              <button className="pop_close" onClick={handleClosePopup}>X</button>

            </div>
          </div>
        )}
        {popupVisible && (
        <div className="popup">
          <div className="popup_content">
          <p>회원탈퇴가 완료되었습니다.</p>
          <button className="pop_ok" onClick={handleClosePopup}>확인</button>
          <button className="pop_close" onClick={handleClosePopup}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
