import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../common/confirmAlert';
import Config from '../common/config';
import accessTokenApi from '../common/tokenApi';
import Avatar from '@mui/material/Avatar';
import accessKey from '../common/awsS3';
import AWS from 'aws-sdk';
import { useNavigate } from 'react-router-dom';
import removeCookieToken, { removeAccessToken } from '../common/cookieStorage';

const initMemberInfo = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  phone: '',
  address: '',
  addressdetail: '',
  zip: '',
  authenticationNumber: '',
};

const ProfilePage = () => {
  const [memberInfo, setMemberInfo] = useState(initMemberInfo);
  const [isAuthentication, setIsAuthentication] = useState(true);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [isPasswordRegex, setIsPasswordRegex] = useState(''); //정규식 틀리면 false
  const [infoChangePopup, setInfoChangePopup] = useState(false);
  const [isPhoneChange, setIsPhoneChange] = useState('');
  const [popupVisible, setPopupVisible] = useState();
  const member = useSelector((state) => state.member);
  const [file, setFile] = useState(`/images/jamong.png`); //이미지주소 blob형태
  const [imgFile, setImgFile] = useState(null); //이미지파일
  const [preview, setPreview] = useState('');

  const [imgBlob, setImgBlob] = useState(null);
  const [isPassword, setIsPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imgRef = useRef(null);
  const reader = new FileReader();

  // let blob = new Blob([new ArrayBuffer(data)], { type: "image/png" });
  // const url = window.URL.createObjectURL(blob);

  const getImg = () => {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };
  console.log(file);
  console.log(imgFile);

  // const handleFileChange = (e) => {
  //   console.log(e.target.files[0]);
  //   const fileIn = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     const blob = new Blob([reader.result], { type: fileIn.type });
  //     setFile(blob); // Blob으로 변환된 파일을 imgFile 상태 변수에 저장
  //     setImgFile(URL.createObjectURL(blob)); // Blob을 URL로 변환하여 file 상태 변수에 저장
  //     // getImg();
  //   };

  //   reader.readAsArrayBuffer(fileIn); // 파일을 ArrayBuffer로 읽습니다.
  // };

  const handleFileChange = (e) => {
    const fileIn = e.target.files[0];
    // const reader = new FileReader();

    reader.onloadend = () => {
      const blob = new Blob([reader.result], { type: fileIn.type });
      setFile(blob); // Blob으로 변환된 파일을 imgFile 상태 변수에 저장
      setImgFile(URL.createObjectURL(blob)); // Blob을 URL로 변환하여 file 상태 변수에 저장
      // getImg();
    };

    reader.readAsArrayBuffer(fileIn); // 파일을 ArrayBuffer로 읽습니다.
  };

  // const handleFileChange = (e) => {
  //   console.log(e.target.files[0]);
  //   const fileIn = e.target.files[0];
  //   setImgFile(fileIn); //이미지파일그대로 넣기
  //   const fileUrl = URL.createObjectURL(fileIn); //url로 만들어 넣기
  //   setFile(fileUrl);
  //   getImg();
  // };
  function checkPassword(password) {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;
    const test = regex.test(password);
    setIsPasswordRegex(test);
  }
  const clickFileInput = () => {
    imgRef.current?.click();
  };

  //정보변경 저장 누를때 호출 /S3에 저장
  const uploadFile = async () => {
    const S3_BUCKET = 'jamongide';
    const REGION = 'Asia Pacific (Seoul) ap-northeast-2';

    AWS.config.update({
      region: REGION,
      accessKeyId: accessKey.accessKeyId,
      secretAccessKey: accessKey.secretAccessKey,
    });

    // const s3 = new AWS.S3({
    //   params: { Bucket: S3_BUCKET },
    //   region: REGION,
    // });

    // const params = {
    //  ACL: 'public-read',
    //   Bucket: S3_BUCKET,
    //   Key: imgFile.name,
    //   Body: imgFile,
    // };
    // console.log(params);
    // var upload = s3
    //   .putObject(params)
    //   .on('httpUploadProgress', (evt) => {
    //     console.log(
    //       'Uploading ' + parseInt((evt.loaded * 100) / evt.total) + '%'
    //     );
    //   })
    //   .promise();

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: S3_BUCKET, // 버킷 이름
        Key: imgFile.name, // 파일 이름
        Body: imgFile, // 파일 객체
      },
    });

    // await upload.then((err, data) => {
    //   console.log(err);
    //   alert('File uploaded successfully.');
    // });
    const promise = upload.promise();
    promise.then(
      function () {
        // 이미지 업로드 성공
        window.setTimeout(function () {
          // Location.reload();
        }, 2000);
      },
      function (err) {
        console.log(err);
        // 이미지 업로드 실패
      }
    );
  };

  useEffect(() => {
    infoGet();
  }, []);

  async function infoGet() {
    const data = await accessTokenApi.get('jamong/member/info', {
      headers: {
        Authorization: member.token,
      },
    });
    setMemberInfo({
      name: data.data[0].memberName,
      email: data.data[0].memberEmail,
      phone: data.data[0].memberPhone,
      address: data.data[0].memberAddress,
      addressdetail: data.data[0].memberAddressDetail,
      zip: data.data[0].memberAddressZip,
      password: '',
      passwordConfirm: '',
    });
    setIsPhoneChange(data.data[0].memberPhone);
    if (data.data[0].memberFile !== null) {
      setFile(data.data[0].memberFile);
      getImg();
    }
  }

  function memberChanged(infoName, e) {
    const member = { ...memberInfo };
    member[infoName] = e.target.value;
    setMemberInfo(member);
  }

  async function phoneClick() {
    const validity = await axios({
      method: 'post',
      url: encodeURI(Config.API_SERVER + 'jamong/member/signup/phone'),
      data: { memberPhone: memberInfo['phone'] },
    });
    console.log(validity);
    setIsAuthentication(false);
    const payload = {
      text: '인증번호가 발송되었습니다.',
      open: true,
    };
    return dispatch(showAlert(payload));
  }

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

  const handleWithdrawal = () => {
    setConfirmationVisible(!confirmationVisible); // 회원탈퇴 팝업 열기
  };

  const isConfirm = (passwordConfirm) => {
    if (passwordConfirm === memberInfo['password']) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

  async function withdraw() {
    //딜리트 api붙이기
    const deleteMember = await accessTokenApi.delete('jamong/member/delete', {
      headers: {
        Authorization: member.token,
      },
    });
    deleteMember();
    dispatch(Logout());
    removeCookieToken();
    localStorage.clear();
    setConfirmationVisible(false);
    setPopupVisible(true); //회원탈퇴 완료창 띄움
  }
  const withdrawClosePopup = () => {
    setPopupVisible(false);
    window.location.reload();
  };

  const closePopup = () => {
    setConfirmationVisible(false);
  };

  const completeClosePopup = () => {
    setInfoChangePopup(false);
    navigate('/container');
  };

  const alertText = () => {
    if (memberInfo['name'] === '') {
      return '이름을 작성해 주시기 바랍니다.';
    }
    if (memberInfo['email'] === '') {
      return '이메일이 유효하지 않습니다.';
    }
    if (isValidEmail === false) {
      return '중복된 아이디가 존재합니다. 다른 아이디를 사용해주세요.';
    }
    if (memberInfo['password'] === '') {
      return '비밀번호를 입력해 주시기 바랍니다.';
    }
    if (isPasswordRegex === false) {
      return '비밀번호가 유효하지 않습니다.';
    }
    if (memberInfo['passwordConfirm'] !== memberInfo['password']) {
      return '비밀번호 확인이 틀립니다.';
    }
    if (memberInfo['address'] === '주소') {
      return '주소를 입력해 주시기 바랍니다.';
    }
    if (memberInfo['detail_address'] === '상세주소') {
      return '상세주소를 입력해 주시기 바랍니다.';
    }
    if (memberInfo['phone'] !== isPhoneChange) {
      return '휴대번호가 변경되었으나 휴대폰 인증이 완료되지 않았습니다.';
    }

    if (isAuthentication === false) {
      return '휴대폰 인증을 완료해주시기 바랍니다.';
    }
    return 'complete';
  };

  async function saveComplete() {
    let textBox = alertText();
    if (textBox !== 'complete') {
      const payload = {
        text: textBox,
        open: true,
      };
      return dispatch(showAlert(payload));
    }
    //put api 붙이기
    const sandData = {
      memberIdMail: memberInfo['email'],
      memberName: memberInfo['name'],
      memberPass: memberInfo['password'],
      memberPhone: memberInfo['phone'],
      memberAddress: memberInfo['address'],
      memberZip: memberInfo['zip'],
      memberAddressDetail: memberInfo['addressdetail'],
      memberFile: file,
    };
    const data = await accessTokenApi.put('jamong/member/modify', {
      data: sandData,
      headers: {
        Authorization: member.token,
      },
    });
    console.log(data);
    //uploadFile();
    setInfoChangePopup(!infoChangePopup);
  }

  return (
    <div className="profile_box">
      <div className="pro_inner">
        <div className="picture_box">
          {preview === '' ? (
            <Avatar
              sx={{
                mt: 1,
                width: 200,
                height: 200,
                backgroundColor: '#FFF7F4',
              }}
              alt="profile_picture"
              src={file}
            />
          ) : (
            <img className="picture" src={preview} />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={imgRef}
            hidden
          />
          <button className="p_select" onClick={clickFileInput}>
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
              onChange={(e) => {
                memberChanged('password', e);
                checkPassword(e.target.value);
              }}
            />
            {memberInfo['password'] === '' ? (
              <></>
            ) : isPasswordRegex ? (
              <img
                className="check02"
                src="/images/checked.png"
                alt="checked"
              />
            ) : (
              <img className="check02" src="/images/cancel.png" alt="cancel" />
            )}
          </li>

          <li>
            <input
              className="list1"
              type="password"
              placeholder="비밀번호 확인"
              value={memberInfo['passwordConfirm']}
              onChange={(e) => {
                memberChanged('passwordConfirm', e);
                isConfirm(e.target.value);
              }}
              maxLength="16"
            />
            {memberInfo['passwordConfirm'] === '' ? (
              <></>
            ) : isPassword ? (
              <img
                className="check02"
                src="/images/checked.png"
                alt="checked"
              />
            ) : (
              <img className="check02" src="/images/cancel.png" alt="cancel" />
            )}
          </li>

          <li>
            <input
              className="list2"
              type="text"
              placeholder="주소[우편번호]"
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
              name="addressdetail"
              value={memberInfo['addressdetail']}
              onChange={(e) => memberChanged('addressdetail', e)}
              maxLength="49"
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
            <button className="pro_b" onClick={() => authNumberClick()}>
              확인
            </button>
          </li>
        </ul>
      </div>

      <div className="member_info">
        <button className="m_change" onClick={uploadFile}>
          정보 변경
        </button>
        <button className="m_cancel" onClick={handleWithdrawal}>
          회원 탈퇴
        </button>
      </div>

      {confirmationVisible && (
        <div className="popup">
          <div className="popup_content">
            <p> 자몽 IDE에서 탈퇴하시겠습니까?</p>
            <button className="pop_yes" onClick={withdraw}>
              확인
            </button>
            <button className="pop_no" onClick={closePopup}>
              취소
            </button>
          </div>
        </div>
      )}
      {infoChangePopup && (
        <div className="popup">
          <div className="popup_content">
            <p>개인정보 변경이 완료되었습니다.</p>
            <button className="pop_ok" onClick={completeClosePopup}>
              확인
            </button>
          </div>
        </div>
      )}
      {popupVisible && (
        <div className="popup">
          <div className="popup_content">
            <p>회원탈퇴가 완료되었습니다.</p>
            <button className="pop_ok" onClick={withdrawClosePopup}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
