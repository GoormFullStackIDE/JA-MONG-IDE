import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from '../common/confirmAlert';

export default function Step1(props) {
  const dispatch = useDispatch();

  const [checkAgree, setCheckAgree] = useState({
    privacy: 'agree',
    terms: 'agree',
  });

  function onCheck(e) {
    const { name, value } = e.target;
    setCheckAgree({ ...checkAgree, [name]: value });
  }

  const next = () => {
    if (checkAgree.privacy === 'disagree') {
      const payload = {
        title: '개인정보 수집 동의',
        text: '개인정보 수집에 동의하여 주시기 바랍니다. 동의하지 않으시면 가입이 불가능합니다.',
        open: true,
      };
      return dispatch(showAlert(payload));
    }
    if (checkAgree.terms === 'disagree') {
      const payload = {
        title: '이용약관',
        text: '이용약관에 동의하여 주시기 바랍니다. 동의하지 않으시면 가입이 불가능합니다.',
        open: true,
      };
      return dispatch(showAlert(payload));
    } else {
      props.setStepNum(1);
    }
  };
  return (
    <div className="join_box_03">
      <section className="join_box_05">
        <div className="join_box_03_1">
          <iframe
            title="This is a unique title"
            src="/privacy.html"
            frameborder="0"
          />
        </div>
        <div className="join_box_04">
          <input
            className="input_radio_01"
            type="radio"
            id="radio1"
            name="privacy"
            value="agree"
            defaultChecked={true}
            onChange={onCheck}
          />
          <label htmlFor="radio1">동의합니다. </label>
          <input
            className="input_radio_01"
            type="radio"
            id="radio2"
            name="privacy"
            value="disagree"
            onChange={onCheck}
          />
          <label htmlFor="radio2">동의하지않습니다. </label>
        </div>
      </section>
      <section className="join_box_05">
        <div className="join_box_03_1">
          <iframe
            title="This is a unique title"
            src="/terms.html"
            frameborder="0"
          />
        </div>
        <div className="join_box_04">
          <input
            className="input_radio_01"
            type="radio"
            id="radio3"
            name="terms"
            value="agree"
            defaultChecked={true}
            onChange={onCheck}
          />
          <label htmlFor="radio3">동의합니다. </label>
          <input
            className="input_radio_01"
            type="radio"
            id="radio4"
            name="terms"
            value="disagree"
            onChange={onCheck}
          />
          <label htmlFor="radio4">동의하지않습니다. </label>
        </div>
      </section>
      <button className="button_01" onClick={() => next()}>
        다음
      </button>
    </div>
  );
}
