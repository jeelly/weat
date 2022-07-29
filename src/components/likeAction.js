import instance from "../shared/axios";
import { loadMyReviewDB } from "../redux/modules/myReviewSlice";


export const likeAction = async (madiId, likeDone, dispatch) => {

    try {      
        if(likeDone){
            const res = await instance.delete(`/api/like/${madiId}`);
            dispatch(loadMyReviewDB()) 
            console.log(res)         
            
        }else if(!likeDone){
            const res = await instance.post(`/api/like/${madiId}`);  
            dispatch(loadMyReviewDB())
            console.log(res)
        } 
    } catch (e) {
      console.log(e);
    }
  };