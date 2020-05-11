import * as ApiVideo from "../../api/video"
import * as ApiBookmark from "../../api/bookmark"


const formatData = (type, data) => {
    return {
        type,
        payLoad: data
    }
}


export const getAllVideos = () => {

    return dispatch =>{
        return ApiVideo.getAllVideos().then(res => {
            dispatch({
                type:"load_videos"
            });
            return res;
    
        })

    }  

}

export const updateVideoView = (view,id) =>{
    return dispatch =>{
        return ApiVideo.updateVideoView(view,id).then(res=>{
            return res;
        })
    }
}

export const bookmarkVideo = (data) =>{
    return dispatch=>{
        return ApiBookmark.bookmarkVideo(data).then(res=>{
            return res;
        })
    }
}

export const unBookmarkVideo = (id) =>{
    return dispatch=>{
        return ApiBookmark.unBookmarkVideo(id).then(res=>{
            return res;
        })
    }
}

export const getVideoById = (id) =>{
    return dispatch =>{
        return ApiVideo.getVideoById(id).then(res=>{
            return res.data
        })
    }
}

export const getVideosByAnime = (anime) =>{
    return dispatch =>{
        return ApiVideo.getVideosByAnime(anime).then(res=>{
            return res;
        })
    }
}


