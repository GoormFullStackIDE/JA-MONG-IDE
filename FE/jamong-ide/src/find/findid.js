import React, { useState } from 'react';
import axios from 'axios';
import Config from '../common/config';
import { useDispatch } from 'react-redux';
import { showAlert } from '../common/confirmAlert';

const initInfo = {
  name: '',
  phone: '',
  authenticationNumber: '',
};

function FindIdPage() {
  const [findMember, setFindMember] = useState(initInfo);
  const [authPhoneNumber, setAuthPhoneNumber] = useState('');
  const [isAuthentication, setIsAuthentication] = useState(false);
  const dispatch = useDispatch();

  function memberChanged(a, e) {
    const member = { ...findMember };
    member[a] = e.target.value;
    setFindMember(member);
  }

  async function phoneClick() {
    const validity = await axios({
      method: 'post',
      url: encodeURI(Config.API_SERVER + 'jamong/member/signup/phone'),
      data: { memberPhone: findMember['phone'] },
    });
    console.log(validity);
    setAuthPhoneNumber(validity.data);
  }

  function authNumberClick() {
    if (authPhoneNumber == findMember['authenticationNumber']) {
      setIsAuthentication(true);
      const payload = {
        title: '휴대폰 인증',
        text: '인증이 완료되었습니다.',
        open: true,
      };
      return dispatch(showAlert(payload));
    } else {
      setIsAuthentication(false);

      const payload = {
        title: '휴대폰 인증',
        text: '인증번호가 일치하지 않습니다.',
        open: true,
      };
      return dispatch(showAlert(payload));
    }
  }

  const blankText = () => {
    if (findMember['name'] === '') {
      return '이름을 작성해주시기 바랍니다.';
    }
    if (isAuthentication === false) {
      return '휴대폰 인증을 완료해주시기 바랍니다.';
    }
    return 'complete';
  };

  async function findIdPost() {
    let textBox = blankText();
    if (textBox !== 'complete') {
      const payload = {
        text: textBox,
        open: true,
      };
      return dispatch(showAlert(payload));
    }

    const memberId = await axios({
      method: 'post',
      url: encodeURI(Config.API_SERVER + 'jamong/member/idfind'),
      data: {
        memberName: findMember['name'],
        memberPhone: findMember['phone'],
      },
    });
    console.log(memberId.data);

    if (memberId.data === '') {
      const payload = {
        title: '입력하신 정보와 일치하는 아이디가 없습니다.',
        open: true,
      };
      return dispatch(showAlert(payload));
    } else {
      const payload = {
        title: '입력하신 정보와 일치하는 아이디 입니다.',
        text: memberId.data,
        open: true,
        path: '/',
      };
      return dispatch(showAlert(payload));
    }
  }

  return (
    <div id="find">
      <div className="logo_img_box">
        <img src="/images/jamingIdeLogo.png" alt="jamongLogo" />
      </div>
      <div className="find_box">
        <p>아이디 찾기</p>
        <div className="find_box_01">
          <input
            className="input_00"
            id="name"
            name="name"
            value={findMember['name']}
            placeholder="이름"
            maxLength="49"
            onChange={(e) => memberChanged('name', e)}
          ></input>
          <input
            className="input_00"
            placeholder="휴대번호"
            id="phone"
            name="phone"
            value={findMember['phone'].replace(/[^0-9]/g, '')}
            maxLength="11"
            onChange={(e) => memberChanged('phone', e)}
          ></input>
          <button className="findbutton_01" onClick={() => phoneClick()}>
            인증번호 받기
          </button>
          <input
            className="input_01"
            placeholder="인증번호"
            name="authenticationNumber"
            id="authenticationNumber"
            value={findMember['authenticationNumber']}
            onChange={(e) => memberChanged('authenticationNumber', e)}
            maxLength="30"
          ></input>
          <button className="button_02" onClick={() => authNumberClick()}>
            확인
          </button>
          <button className="findbutton_02" onClick={() => findIdPost()}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
export default FindIdPage;
