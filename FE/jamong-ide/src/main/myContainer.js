import React, { useEffect, useState } from 'react';
import accessTokenApi from '../common/tokenApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const listData = [
  { id: '0', projectName: 'dkdi0', containerId: '123', isLeader: true },
  { id: '1', projectName: 'dkdi1', containerId: '123', isLeader: true },
  { id: '2', projectName: 'dkdi2', containerId: '456', isLeader: false },
  { id: '3', projectName: 'dkdi3', containerId: '789', isLeader: false },
  { id: '4', projectName: 'dkdi4', containerId: '789', isLeader: false },
  { id: '5', projectName: 'dkdi5', containerId: '789', isLeader: false },
  { id: '6', projectName: 'dkdi6', containerId: '789', isLeader: false },
  { id: '7', projectName: 'dkdi7', containerId: '789', isLeader: false },
  { id: '8', projectName: 'dkdi8', containerId: '789', isLeader: false },
];
export default function MyContainer() {
  const [list, setList] = useState([]);
  const member = useSelector((state) => state.member);
  const navigate = useNavigate();

  useEffect(() => {
    myContainerlist();
  }, [list]);

  async function myContainerlist() {
    const containerList = await accessTokenApi.get(
      'jamong/project-member/main-index',
      {
        headers: {
          Authorization: member.token,
        },
      }
    );
    console.log(containerList);
    setList(containerList);
  }
  return (
    <div className="container">
      {list.length &&
        list.map((item) => {
          return item.isLeader === true ? (
            <div className="com_con con_1" key={item.id}>
              <p className="name">{item.projectName}</p>
              <p className="stack"> PYTHON</p>
              <button
                className="play"
                onClick={() => navigate('idepage' + item.containerId)}
              >
                실행하기
              </button>
            </div>
          ) : (
            <></>
          );
        })}
      {/* <div className="com_con con_1">
        <p className="name">프로젝트이름</p>
        <p className="stack"> PYTHON</p>
        <button className="play">실행하기</button>
      </div> */}
    </div>
  );
}
