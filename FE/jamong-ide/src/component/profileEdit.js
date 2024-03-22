import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showAlert } from '../common/confirmAlert';
import Config from '../common/config';

const initMemberInfo = {
  name: '',
  mail: '',
  password: '',
  phone: '',
  address: '',
  addressdetail: '',
  zip: '',
  authenticationNumber: '',
};

const ProfilePage = () => {
  const [memberInfo, setMemberInfo] = useState(initMemberInfo);
  const [isAuthentication, setIsAuthentication] = useState(false);

  function authNumberClick() {
    if (memberInfo['authenticationNumber'] == memberInfo['authNumber']) {
      const payload = {
        text: '휴대번호 인증이 완료되었습니다.',
        open: true,
      };
      dispatch(showAlert(payload));
      setIsAuthentication(true);
    } else {
      const payload = {
        text: '인증번호가 틀립니다.',
        open: true,
      };
      dispatch(showAlert(payload));
    }
  }

  /* eslint no-undef:"off" */
  function selectAddress() {
    // 주소 찾기
    if (typeof daum != 'undefined') {
      new daum.Postcode({
        oncomplete: function (data) {
          var extraRoadAddr = ''; // 동, 건물이름

          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          if (data.buildingName !== '') {
            extraRoadAddr +=
              extraRoadAddr !== ''
                ? ', ' + data.buildingName
                : data.buildingName;
          }
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }

          const roadAddr = { ...memberInfo };
          roadAddr.address = data.roadAddress + extraRoadAddr;
          roadAddr.zip = data.zonecode;

          setMemberInfo(roadAddr);
        },
      }).open();
    }
  }

  async function phoneClick() {
    const validity = await axios({
      method: 'post',
      url: encodeURI(Config.API_SERVER + 'jamong/member/signup/phone'),
      data: { memberPhone: memberInfo['phone'] },
    });
    console.log(validity);
    // setMemberInfo({ ...memberInfo, authenticationNumber: validity.data });
    const payload = {
      text: '인증번호가 발송되었습니다.',
      open: true,
    };
    return dispatch(showAlert(payload));
  }

  const handleWithdrawal = () => {
    setConfirmationVisible(true); // 회원탈퇴 팝업 열기
  };
  const isConfirm = (passwordConfirm) => {
    if (passwordConfirm === memberInfo['password']) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

  const handleConfirmYes = () => {
    setConfirmationVisible(false);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setInfoChangePopupVisible(false);
  };

  function memberChanged(infoName, e) {
    const member = { ...memberInfo };
    member[infoName] = e.target.value;
    setMemberInfo(member);
    console.log(memberInfo);
  }

  return (
    <div className="profile_box">
      <div className="pro_inner">
        <div className="picture_box">
          <p className="pro_pic"></p>
          <button className="p_select" onClick="">
            이미지 선택
          </button>
        </div>
        <ul className="pro_list">
          <li>
            <input
              className="list1"
              type="text"
              placeholder="이름"
              value={memberInfo['name']}
              onChange={(e) => memberChanged('name', e)}
              disabled={true}
            />
          </li>
          <li>
            <input
              className="list1"
              type="text"
              placeholder="이메일"
              value={memberInfo['email']}
              onChange={(e) => memberChanged('email', e)}
              disabled={true}
            />
          </li>
          <li>
            <input
              className="list1"
              type="password"
              placeholder="비밀번호 (영문 대소문자, 숫자 특수문자 8-16자)"
              value={memberInfo['password']}
              onChange={(e) => memberChanged('password', e)}
            />
          </li>
          <li>
            <input
              className="list1"
              type="password"
              placeholder="비밀번호 확인"
              value={memberInfo['password']}
              onChange={(e) => memberChanged('password', e)}
            />
          </li>
          <li>
            <input
              className="list2"
              type="text"
              placeholder="주소"
              disabled={true}
              name="zip"
              id="zip"
              value={memberInfo['address'] + ' [ ' + memberInfo['zip'] + ' ]'}
              onChange={(e) => memberChanged('zip', e)}
            ></input>
            <button
              className="pro_b"
              onClick={() => {
                selectAddress();
              }}
            >
              찾기
            </button>
          </li>
          <li>
            <input
              className="list1"
              type="text"
              placeholder="상세주소"
              value={memberInfo['address_detail']}
              onChange={(e) => memberChanged('detail_address', e)}
            />
          </li>
          <li>
            <input
              className="list2"
              type="text"
              placeholder="핸드폰"
              value={memberInfo['phone'].replace(/[^0-9]/g, '')}
              onChange={(e) => memberChanged('phone', e)}
            />
            <button className="pro_b" onClick={() => phoneClick()}>
              인증
            </button>
          </li>
          <li>
            <input
              className="list2"
              type="text"
              placeholder="인증번호"
              value={memberInfo['authenticationNumber']}
              onChange={(e) => memberChanged('authenticationNumber', e)}
            />
            <button className="pro_b">확인</button>
          </li>
        </ul>
      </div>
      <div className="member_info">
        <button className="m_change">정보 변경</button>
        <button className="m_cancel">회원 탈퇴</button>
      </div>

      {confirmationVisible && (
        <div className="popup">
          <div className="popup_content">
            <p> 자몽 IDE에서 탈퇴하시겠습니까?</p>
            <button className="pop_yes" onClick={handleConfirmYes}>
              확인
            </button>
            <button
              className="pop_no"
              onClick={() => setConfirmationVisible(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}
      {infoChangePopupVisible && (
        <div className="popup">
          <div className="popup_content">
            <p>개인정보 변경이 완료되었습니다.</p>
            <button className="pop_ok" onClick={handleClosePopup}>
              확인
            </button>
            <button className="pop_close" onClick={handleClosePopup}>
              X
            </button>
          </div>
        </div>
      )}
      {popupVisible && (
        <div className="popup">
          <div className="popup_content">
            <p>회원탈퇴가 완료되었습니다.</p>
            <button className="pop_ok" onClick={handleClosePopup}>
              확인
            </button>
            <button className="pop_close" onClick={handleClosePopup}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
