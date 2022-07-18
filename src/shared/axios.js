import axios from "axios";

export const getToken = () => localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;


//인스턴스 생성
export const instance = axios.create({  
  baseURL: "https://realprojectapiserver.com/",
  headers: {  Authorization: getAuthorizationHeader() },
});

//토큰값
const token = localStorage.getItem("token")
instance.defaults.headers.common["Authorization"] =`Bearer ${token}`

export default instance ;

//요청 가로채기
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getAuthorizationHeader();
    return config;
  }
  ,(err) => {
    return Promise.reject(err);
  }
);