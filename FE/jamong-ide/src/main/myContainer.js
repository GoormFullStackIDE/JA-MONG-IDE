import React, { useState } from 'react';

export default function MyContainer() {
  return (
    <div className="container">
      <div className="com_con con_1">
        <p className="name">컨테이너 이름</p>
        <p className="stack"> PYTHON</p>
        <button className="play">실행하기</button>
      </div>
      <div className="con_2 com_con">
        <p>컨테이너 2</p>
      </div>
    </div>
  );
}
