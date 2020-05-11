import axios from "axios";


export const createVideo = async (data) => {
    return axios.post("https://amvapp.herokuapp.com/video", data).then(res => {
        return res;

    })

}

export const createThumbnail = async (data) => {
    return axios.post("https://amvapp.herokuapp.com/thumbnail", data).then(res => {
        return res;

    })

}

export const getAllVideos = async () => {
    return axios.get("https://amvapp.herokuapp.com/video").then(res => {
        return res;
    })
}

export const getVideosByAnime = (anime) => {
    return axios.get(`https://amvapp.herokuapp.com/video/${anime}`).then(res => {
        return res;
    })
}

export const updateVideoView = (view, id) => {
    return axios.put(`https://amvapp.herokuapp.com/video/${id}`, view).then(res => {
        return res
    })
}

export const getVideoById = async (id) => {
    return axios.post("https://amvapp.herokuapp.com/video/find", id).then(res => {
        return res;
    })
}



