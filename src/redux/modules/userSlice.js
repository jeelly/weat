import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {instance, getAuthorizationHeader} from '../../shared/axios'


export const loggedInDB = createAsyncThunk(
  'user/isLoggedIn',  
  async ({navigate, dispatch}) => {
    const userToken = window.location.href.split('=')[1]
    if(userToken){
      localStorage.setItem('token',userToken)
    }
  try {
    const response = await instance.get("/api/users/me", { 
      headers: { Authorization: getAuthorizationHeader() }
    });   
    await  dispatch(loginCheck(true))
    

    return response.data.user;
  } catch (error) {
    navigate('/login')
  }
});



const userCheckSlice = createSlice({
    name: "loggedIn",
    initialState: {
      isLogin: false,
      userInfo: {
        userId: "",
        customerId: "",
        name: "",
        birthDay: "",
        email: "",
        nickname: "",
        faceColor: "",
        eyes: "",
      },
    },
    reducers: {
      loginUserCheck(state, action) {
        state.userInfo = action.payload;
      },
      loginCheck(state, action){
        state.isLogin = action.payload
      }
    },
    extraReducers:{
      [loggedInDB.fulfilled]: (state, action) => {
        state.userInfo = action.payload;
      }
    }
  });


  export const {loginUserCheck, loginCheck} = userCheckSlice.actions;
  export default userCheckSlice.reducer