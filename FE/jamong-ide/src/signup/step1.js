import React from 'react';

export default function Step1(props) {
  const next = () => {
    props.setStepNum(1);
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
          <input className="input_radio_01" type="radio" id="radio1" />
          <label htmlFor="radio1">동의합니다. </label>
          <input className="input_radio_01" type="radio" id="radio2" />
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
          <input className="input_radio_01" type="radio" id="radio3" />
          <label htmlFor="radio3">동의합니다. </label>
          <input className="input_radio_01" type="radio" id="radio4" />
          <label htmlFor="radio4">동의하지않습니다. </label>
        </div>
      </section>
      <button className="button_01" onClick={() => next()}>
        다음
      </button>
    </div>
  );
}
