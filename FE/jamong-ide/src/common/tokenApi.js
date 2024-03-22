import React, { useState, useContext } from 'react';
import axios from 'axios';
import { getCookieToken, removeCookieToken } from './cookieStorage';
import { TokenContext } from '../common/tokenContext';

const TokenApi = () => {
  //토큰이 작동안할경우 Bearer지우기
  const { token } = useContext(TokenContext);
  console.log('accessToken', token);

  // 회원정보를 가져올때 액세스토큰을 가져와서 헤더에 붙여 함께 axios를 보내는 함수
  const accessTokenApi = () => {
    return axios.create({
      baseURL: Config.API_SERVER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  //리프레쉬 토큰을 쿠키에서 가져와서 새로운 액세스토큰을 받아오는 함수
  async function postRefreshToken() {
    const response = await axios.post('jamong/member/accesstoken', {
      refreshToken: getCookieToken,
    });
    return response;
  }

  //액세스토큰이 만료되었을때 ( 헤더 비워줘야함 ) 인터럽트해서 리프레쉬토큰으로 액세스토큰을 다시받아오는 함수
  accessTokenApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      //선언
      const {
        config,
        response: { status },
      } = error;
      //401 : accessToken 만료에러
      if (status === 401) {
        if (error.response.data.message === 'Unauthorized') {
          const originRequest = config;
          try {
            const tokenResponse = await postRefreshToken();
            //201 : accessToken 재발급 성공
            if (tokenResponse.status === 201) {
              const newAccessToken = tokenResponse.headers.authorization;
              axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
              originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
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
                window.location.replace('/login');
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
};
export default TokenApi;
