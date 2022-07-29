import { createSlice } from "@reduxjs/toolkit";


const notiSlice = createSlice({
    name:'noti',
    initialState:{
        newNoti:[],
        notiList:[]
    },
    reducers:{
        addNotiList(state, action){
            state.notiList = action.payload
        }

    }
})


export const {addNotiList} = notiSlice.actions
export default notiSlice.reducer