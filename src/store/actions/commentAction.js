
import * as ApiComment from "../../api/comment"


const formatData = (type, data) => {
    return {
        type,
        payLoad: data
    }
}


export const commentToVideo = (data) => {

    return dispatch =>{
        return ApiComment.commentToVideo(data).then(res => {
            return res;
    
        })

    }  

}

export const deleteComment = (id) => {

    return dispatch =>{
        return ApiComment.deleteComment(id).then(res => {
            return res;
    
        })

    }  

}



