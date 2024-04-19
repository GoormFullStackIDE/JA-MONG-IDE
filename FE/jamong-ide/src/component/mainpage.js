import React, { useState } from 'react';


const Mainpage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStack, setSelectedStack] = useState(""); // 드롭다운의 선택된 값의 상태
    const [containerName, setContainerName] = useState("");

    const handleStackClick = (stack) => {
        setSelectedStack(stack)
        setShowModal(true);
    };

    const handleModalToggle = () => {
        setShowModal(!showModal); // 모달 창을 열거나 닫는 함수
    };

    const handleStackChange = (e) => {
        setSelectedStack(e.target.value); // 드롭다운에서 선택된 값을 상태에 반영하는 함수
    };

    return (
        <div>
            <div className="main_container">
                <h1 className="m_title">모든 컨테이너</h1>
                <div className="m_tools">
                    <div className="m_tools1 python" onClick={() => handleStackClick("python")}>
                        <p>Python</p>
                    </div>
                    <div className="m_tools1 c/c++" onClick={() => handleStackClick("c/c++")}>
                        <p>C/C++</p>
                    </div>
                    <div className="m_tools1 javascript" onClick={() => handleStackClick("javascript")}>
                        <p>Javascript</p>
                    </div>
                    <div className="m_tools1 java" onClick={() => handleStackClick("java")}>
                        <p>Java</p>
                    </div>
                </div>
            </div>
            <div className='searchBar'>
                <input type="text" placeholder="컨테이너 검색" />
            </div>
            <article className='container'>
                <div className="com_con con_1">
                    <p className='name'>컨테이너 이름</p>
                    <p className='stack'> PYTHON</p>
                    <button className='play'>
                        <p>실행하기</p>
                    </button>
                </div>
                <div className='con_2 com_con'>
                    <p>컨테이너 2</p>
                </div>
            </article>
            <div className='share'>
                <p className='s_p'>공유받은 컨테이너</p>
                <div className='s_con com_con'>
                    <p>컨테이너 1</p>
                </div>
            </div>

            {showModal && (
                <div className="modal_content">
                    <div className="modal_body">
                        <span className="close" onClick={handleModalToggle}>&times;</span>
                        <p className='modal_p1'>컨테이너 생성하기</p>
                        <p className='modal_s'>스택</p>
                        {/* 드롭다운 추가 */}
                        <div className='dropdown'>
                            <select value={selectedStack} onChange={handleStackChange}>
                                <option value="python">Python</option>
                                <option value="c/c++">C/C++</option>
                                <option value="javascript">JavaScript</option>
                                <option value="java">Java</option>
                            </select>
                        </div>
                        <p className='modal_n'>이름</p>
                        <div className='m_name'>
                            <input type="text" placeholder="알파벳, 숫자, 하이픈(-), 언더스코어(_)만 포함한 이름" />
                            <span> 0/20 </span>
                        </div>
                        <button className='m_made'>생성하기</button>
                    </div>
                </div>
            )}

            {/* 프로필 */}
            <div className='profile'>
                <div className='information'>
                    <p className='pic'>사진</p>
                    <p>김이름</p>
                    <p>example@mail.com</p>
                </div>
                <div className='actions'>
                    <p className='edit'>프로필 편집</p>
                    <p className='logout'>로그아웃</p>
                </div>
            </div>

        </div>
    );
};

export default Mainpage;