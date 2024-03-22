import { Cookies } from 'react-cookie';

const cookies = new Cookies();

//리프레쉬토큰을 쿠키에 저장한다.
export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 14);

  return cookies.set('refreshtToken', refreshToken, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expireDate),
  });
};
// expires : 만료

//리프레쉬토큰을 가져오는 함수
export const getCookieToken = () => {
  return cookies.get('refreshtToken');
};

//로그아웃할때 리프레쉬토큰을 지울 때 쓸 함수
export const removeCookieToken = () => {
  return cookies.remove('refreshToken', { sameSite: 'strict', path: '/' });
};

//쿠키 사용저장 함수, 형식이 설정되어있다.
// import {Cookies} from 'react-cookie';

// const cookies = new Cookies();

// export const setCookie = (name: string, value: string, options?: any) => {
//  	return cookies.set(name, value, {...options});
// }

// export const getCookie = (name: string) => {
//  return cookies.get(name);
// }
//
//로그인
// const handleSubmit = async () => {
//     const response = await signIn({email: email, password: password}).unwrap();
//
// 리프레시토큰이 데이터에 담겨져서 왔을때
//쿠키에 저장한다.
//     const {email, nickname, refreshToken} = response;

//     if(refreshToken){
//       setCookie('refreshToken', refreshToken, {
//             path: '/',
//             secure: '/',
//             expires: new Data().getMinutes() + 1;
//       });
//     }
//   }
// path : 쿠키의 값을 저장하는 서버 경로로, '/'일 경우 모든 페이지에서 쿠키에 접근할 수 있도록 설정할 수 있다.
// secure : true인 경우에는 https로 통신할때만 쿠키가 저장된다.
// httponly : document.cookie와 같은 자바스크립트 코드로 접근할 수 없도록 일종의 private 처리를 해준다.
