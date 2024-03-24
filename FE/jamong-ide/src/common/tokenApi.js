// import React, { useState, useContext } from 'react';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import { getCookieToken, removeCookieToken } from './cookieStorage';
// import { TokenContext } from '../common/tokenContext';
import Config from './config';
import { useDispatch, useSelector } from 'react-redux';
import Login from './memberReducer';
//토큰이 작동안할경우 Bearer지우기
// const { token, setToken } = useContext(TokenContext);

// 액세스토큰을 가져와서 헤더에 붙여 함께 axios를 보내는 함수
const accessTokenApi = axios.create({
  baseURL: Config.API_SERVER,
  timeout: 950 * 6300,
  headers: { 'Content-Type': 'application/json' },
  // headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
});
export default accessTokenApi;

//리프레쉬 토큰을 쿠키에서 가져와서 새로운 액세스토큰을 받아오는 함수
async function postRefreshToken() {
  const response = await axios.post('jamong/member/accesstoken', {
    memberIdMail: localStorage.getItem('memberIdMail'),
    memberToken: getCookieToken,
  });
  console.log(response.memberToken);
  console.log(response.data);

  return response;
}

// accessTokenApi.interceptors.request.use(
//   function (config) {
//     config.headers['Content-Type'] = 'application/json; charset=utf-8';
//     // config.headers['Authorization'] = '토큰값';
//     console.log(config);
//     return config;
//   },
//   function (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

accessTokenApi.interceptors.request.use(
  function (config) {
    console.log(config);
    // 토큰 확인
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token'); // 로컬 스토리지에서 accesstoken 조회
      config.headers.Authorization = token; // 조회된 access_token을 헤더에 넣어줌
      console.log(config);
      localStorage.removeItem('token');
    }
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
// 403 : 로그인이 되어있지 않습니다.
//액세스토큰이 만료되었을때 ( 헤더 비워줘야함 ) 인터럽트해서 리프레쉬토큰으로 액세스토큰을 다시받아오는 함수
// accessTokenApi.interceptors.response.use(
// (response) => {
//   return response;
// },
// async (error) => {
//   //요청 받아오기
//   const {
//     config,
//     response: { status },
//   } = error;
//   console.log(error);
//   console.log(response);
//   //410 : accessToken 만료에러
//   if (status === 410) {
//     console.log(response);

//     if (
//       error.response.data.message === 'Access 토큰의 유효기간이 지났습니다.'
//     ) {
//       console.log(config);
//       const originRequest = config;
//       try {
//         const tokenResponse = await postRefreshToken();
//         //201 : accessToken 재발급 성공
//         //200 : accessToken 재발급 성공
//         if (tokenResponse.status === 200) {
//           const newAccessToken = tokenResponse.headers.authorization;
//           axios.defaults.headers.common.Authorization = newAccessToken;
//           localStorage.setItem('token', newAccessToken);
//           originRequest.headers.Authorization = newAccessToken;
//           return axios(originRequest);
//         }
accessTokenApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    console.log(error);
    if (status === 410) {
      console.log(status);
      if (
        error.response.data.message ===
          'Access 토큰의 유효기간이 지났습니다.' &&
        error.message === 'Request failed with status code 410'
      ) {
        const originRequest = config;
        try {
          const tokenResponse = await postRefreshToken();
          //201 : accessToken 재발급 성공
          //200 : accessToken 재발급 성공
          if (tokenResponse.status === 200) {
            const newAccessToken = tokenResponse.headers.authorization;
            console.log(newAccessToken);
            axios.defaults.headers.common.Authorization = newAccessToken;
            localStorage.setItem('token', newAccessToken);
            originRequest.headers.Authorization = newAccessToken;
            return axios(originRequest);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (
              //404 : refreshToken로 한 accessToken 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
              //422 : 요청하는 api의 파라미터에 대한 validation 문제로 (좀 더 정확히는 response Model) 요청실패
              error.response?.status === 404 ||
              error.response?.status === 422
            ) {
              alert('로그인이 만료되었습니다. 다시 로그인해 주시기바랍니다.');
              //window.location.replace('/login');
            } else {
              alert('이유를 알 수 없는 오류로 로그아웃되었습니다.');
            }
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
