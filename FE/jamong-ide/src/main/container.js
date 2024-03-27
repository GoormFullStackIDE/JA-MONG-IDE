import React, { useEffect, useState } from 'react';
import MyContainer from './myContainer';
import SharedContainer from './sharedContainer';
import removeCookieToken, {
  removeAccessToken,
  getAccessToken,
  getCookieToken,
} from '../common/cookieStorage.js';
import accessTokenApi from '../common/tokenApi';
import { showAlert } from '../common/confirmAlert';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Container = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStack, setSelectedStack] = useState(''); // 드롭다운의 선택된 값의 상태
  const [containerName, setContainerName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);
  const location = useLocation();

  console.log(location.state);

  useEffect(() => {
    setAccessToken(getAccessToken());
    setRefreshToken(getCookieToken());
    console.log(refreshToken);
    console.log(accessToken);

    if (
      (accessToken === '' || accessToken === undefined) &&
      refreshToken !== '' &&
      member.authenticated === false
    ) {
      console.log(refreshToken);
      socialJoin();
    }
  }, [accessToken]);

  const handleStackClick = (stack) => {
    setSelectedStack(stack);
    setShowModal(true);
  };

  const socialJoin = () => {
    const payload = {
      text: '소셜 회원가입이 완료되었습니다. 다시 로그인 해주시기 바랍니다.',
      open: true,
    };
    dispatch(showAlert(payload));
  };

  function nameChanged(e) {
    const name = e.target.value;
    setContainerName(name);
    console.log('name', containerName);
  }

  async function createContainerClick() {
    if (containerName !== '') {
      const create = await accessTokenApi.post(
        'jamong/container/create',
        {
          Name: containerName,
          language: selectedStack,
        },
        {
          headers: {
            Authorization: member.token,
          },
        }
      );
      console.log('create', create);
    } else {
      const payload = {
        text: '이름을 입력해주세요',
        open: true,
      };
      dispatch(showAlert(payload));
    }
  }

  const handleModalToggle = () => {
    setShowModal(!showModal); // 모달 창을 열거나 닫는 함수
    if (showModal === true) {
      setContainerName('');
    }
  };

  const handleStackChange = (e) => {
    setSelectedStack(e.target.value); // 드롭다운에서 선택된 값을 상태에 반영하는 함수
  };

  return (
    <div className="all_container_box">
      <div className="main_container">
        <h1 className="m_title">모든 컨테이너</h1>
        <div className="m_tools">
          <div
            className="m_tools1 python"
            onClick={() => handleStackClick('python')}
          >
            <p>Python</p>
          </div>
          <div
            className="m_tools1 c/c++"
            onClick={() => handleStackClick('c/c++')}
          >
            <p>C/C++</p>
          </div>
          <div
            className="m_tools1 javascript"
            onClick={() => handleStackClick('javascript')}
          >
            <p>Javascript</p>
          </div>
          <div
            className="m_tools1 java"
            onClick={() => handleStackClick('java')}
          >
            <p>Java</p>
          </div>
        </div>
      </div>
      <div className="searchBar">
        <input type="text" placeholder="컨테이너 검색" />
      </div>

      {location.state === 'my' ? (
        <MyContainer />
      ) : location.state === 'shared' ? (
        <>
          <p className="s_p">공유받은 컨테이너</p>
          <SharedContainer />
        </>
      ) : (
        <>
          <MyContainer />
          <p className="s_p">공유받은 컨테이너</p>
          <SharedContainer />
        </>
      )}

      {showModal && (
        <div className="modal_content">
          <div className="modal_body">
            <span className="close" onClick={handleModalToggle}>
              &times;
            </span>
            <p className="modal_p1">컨테이너 생성하기</p>
            <p className="modal_s">스택</p>
            {/* 드롭다운 추가 */}
            <div className="dropdown">
              <select
                className="dropdown_select"
                value={selectedStack}
                onChange={handleStackChange}
              >
                <option className="select_option" value="python">
                  Python
                </option>
                <option className="select_option" value="c/c++">
                  C/C++
                </option>
                <option className="select_option" value="javascript">
                  JavaScript
                </option>
                <option className="select_option" value="java">
                  Java
                </option>
              </select>
            </div>
            <p className="modal_n">이름</p>
            <div className="m_name">
              <input
                type="text"
                placeholder="알파벳, 숫자, 하이픈(-), 언더스코어(_)만 포함한 이름 0/20 "
                onChange={nameChanged}
                value={containerName}
              />
            </div>
            <button className="m_made" onClick={createContainerClick}>
              생성하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;
