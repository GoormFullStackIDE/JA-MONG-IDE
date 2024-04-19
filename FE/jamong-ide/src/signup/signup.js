import React, { useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';

function SignUp() {
  const [stepNum, setStepNum] = useState(0);
  const pageInfo = [{ title: '약관동의' }, { title: '회원정보' }];

  return (
    <div id="join">
      <div className="logo_img_box">
        <img src="/images/jamingIdeLogo.png" alt="jamongLogo" />
      </div>
      <div className="join_box">
        {pageInfo[stepNum].title}
        {stepNum === 0 ? <Step1 setStepNum={(s) => setStepNum(s)} /> : <></>}
        {stepNum === 1 ? <Step2 setStepNum={(s) => setStepNum(s)} /> : <></>}
      </div>
    </div>
  );
}
export default SignUp;
