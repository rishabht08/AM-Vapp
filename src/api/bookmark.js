import axios from "axios";


export const bookmarkVideo = async (data) => {
    return axios.post("https://amvapp.herokuapp.com/bookmarked", data).then(res => {
        return res;

    })

}

export const unBookmarkVideo = async (id) => {
    return axios.delete(`https://amvapp.herokuapp.com/bookmarked/${id}`).then(res => {
        return res;

    })

}





