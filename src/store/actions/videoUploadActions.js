import * as ApiAuth from "../../api/video"


const formatData = (type, data) => {
    return {
        type,
        payLoad: data
    }
}
export const changeAnime = (type, data) => {
    return dispatch => {
        dispatch(formatData(type, data))
    }

}

export const changeTitle = (type, data) => {
    return dispatch => {
        dispatch(formatData(type, data))
    }

}

export const createVideo = (data) => {
    return dispatch => {
        return ApiAuth.createVideo(data).then(res => {

            return res;
            // if (res.data.data) {

            //     return res.data;
            // }
            // else{
            //     return null;
            // }
        })

    }
}

export const createThumbnail = (data) => {
    return dispatch => {
        return ApiAuth.createThumbnail(data).then(res => {

            return res;
            // if (res.data.data) {

            //     return res.data;
            // }
            // else{
            //     return null;
            // }
        })

    }
}