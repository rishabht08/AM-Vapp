import axios from "axios"

export const commentToVideo = async (data)=>{
    axios.post("https://amvapp.herokuapp.com/comment" , data).then(res=>{
        return res;
    })
}

export const deleteComment = async (id)=>{
    axios.delete(`https://amvapp.herokuapp.com/comment/${id}` ).then(res=>{
        return res;
    })
}