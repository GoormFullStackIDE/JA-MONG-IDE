import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

const axiosInstance = axios.create({
    baseURL: 'https://jamongide.kdr.kr',  // 서버 주소
    headers: headers,
    withCredentials: true,
});

export default axiosInstance;