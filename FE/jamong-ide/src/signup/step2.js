import React, { useState } from 'react';
import axios from 'axios';
import Config from '../common/config';
import { useNavigate } from 'react-router-dom';

const initMemberInfo = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  zip: '우편번호',
  address: '주소',
  detail_address: '',
  phone: '',
  authenticationNumber: '',
};

export default function Step2() {
  const [memberInfo, setMemberInfo] = useState(initMemberInfo);
  const [emailRegex, setEmailRegex] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true); //중복이면 false
  const [isPassword, setIsPassword] = useState(false);
  const navigate = useNavigate();

  function memberChanged(a, e) {
    const member = { ...memberInfo };
    member[a] = e.target.value;
    setMemberInfo(member);
  }
  console.log(memberInfo);

  const isConfirm = (passwordConfirm) => {
    if (passwordConfirm === memberInfo['password']) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

  async function checkEmail(email) {
    //이메일 형식 검사와 중복체크 함수
    const regex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const reg = regex.test(email);
    setEmailRegex(reg);

    // const validity = await axios.get(
    //   encodeURI(Config.API_SERVER + '/jamong/member/idcheck' + email)
    // );
    // setIsValidEmail(validity.data);
    // console.log(isValidEmail);
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
  function save() {
    navigate('jamong/login');
  }

  return (
    <div>
      <div className="join_box_01">
        <input
          className="input_00"
          id="name"
          name="name"
          value={memberInfo['name']}
          placeholder="이름"
          maxLength="49"
          onChange={(e) => memberChanged('name', e)}
        ></input>
        <input
          className="input_00"
          placeholder="이메일"
          name="email"
          id="email"
          value={memberInfo['email']}
          onChange={(e) => {
            memberChanged('email', e);
            checkEmail(e.target.value);
          }}
          maxLength="49"
        ></input>
        {memberInfo['email'] === '' ? (
          <></>
        ) : emailRegex ? (
          <img className="check" src="/images/checked.png" alt="checked" />
        ) : (
          <img className="check" src="/images/cancel.png" alt="cancel" />
        )}
        <input
          className="input_00"
          placeholder="비밀번호 (영문 대소문자, 숫자 특수문자 8-16자)"
          type="password"
          name="password"
          id="password"
          value={memberInfo['password']}
          onChange={(e) => memberChanged('password', e)}
          maxLength="16"
        ></input>
        <input
          type="password"
          className="input_00"
          placeholder="비밀번호 확인"
          name="passwordConfirm"
          id="passwordConfirm"
          value={memberInfo['passwordConfirm']}
          onChange={(e) => {
            memberChanged('passwordConfirm', e);
            isConfirm(e.target.value);
          }}
          maxLength="16"
        ></input>
        {memberInfo['passwordConfirm'] === '' ? (
          <></>
        ) : isPassword ? (
          <img className="check" src="/images/checked.png" alt="checked" />
        ) : (
          <img className="check" src="/images/cancel.png" alt="cancel" />
        )}
        <div className="join_box_02">
          <input
            className="input_01"
            placeholder="주소[우편번호]"
            disabled={true}
            name="zip"
            id="zip"
            value={memberInfo['address'] + ' [ ' + memberInfo['zip'] + ' ]'}
            onChange={(e) => memberChanged('zip', e)}
          ></input>
          <button
            className="button_02"
            onClick={() => {
              selectAddress();
            }}
          >
            찾기
          </button>
        </div>
        <input
          className="input_00"
          placeholder="상세 주소"
          name="detail_address"
          id="detail_address"
          value={memberInfo['detail_address']}
          onChange={(e) => memberChanged('detail_address', e)}
          maxLength="49"
        ></input>
        <div className="join_box_02">
          <input
            className="input_01"
            placeholder="휴대번호"
            id="phone"
            name="phone"
            defaultValue={memberInfo['phone'].replace(/[^0-9]/g, '')}
            maxLength="49"
          ></input>
          <button className="button_02">인증</button>
        </div>
        <div className="join_box_02">
          <input
            className="input_01"
            placeholder="인증번호"
            name="authenticationNumber"
            id="authenticationNumber"
            value={memberInfo['authenticationNumber']}
            onChange={(e) => memberChanged('authenticationNumber', e)}
            maxLength="30"
          ></input>
          <button className="button_02">확인</button>
        </div>
      </div>
      <div className="button_box ">
        {/* 회원가입이 완료되었습니다 알럿창 띄우기 */}
        <button
          className="button_01 button_gradient"
          type="submit"
          onClick={() => save()}
        >
          회원가입
        </button>
        <button className="button_03">이미 계정이 있나요? 로그인</button>
      </div>
    </div>
  );
}
