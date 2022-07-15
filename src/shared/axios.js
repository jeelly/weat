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

// instance.defaults.headers.common["Authorization"] =`Bearer ${token}`

export default instance ;

// export const login_instance = axios.create({
//   baseURL: "http://localhost:5001",
//   headers: { "Content-Type": "application/json" },
// });