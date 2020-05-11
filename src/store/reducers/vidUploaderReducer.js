
import initialState from "../state"

export function vidUploaderReducer(state = initialState.vidUploader, action) {
    let stateCopy = { ...state};
    switch (action.type) {

        case "anime_change":
            stateCopy.anime = action.payLoad;
            return stateCopy;
        case "image_select":
            stateCopy.imgFile = action.payLoad;
            return stateCopy;
        case "video_selected":
            stateCopy.vidFile = action.payLoad;
            return stateCopy;
        case "img_uploading":
            stateCopy.imgPercent = action.payLoad
            return stateCopy;
        case "vid_uploading":
            stateCopy.vidPercent = action.payLoad
            return stateCopy;
        case "remove_captured":
            stateCopy.captured = false;
            return stateCopy;

        case "reset":
            stateCopy.imgPercent = 0;
            stateCopy.vidPercent = 0;
            stateCopy.vidFile = "";
            stateCopy.imgFile = "";
            stateCopy.title = "Title";
            stateCopy.captured = false
            return stateCopy;
        case "blob":
            stateCopy.captured = true;
            return stateCopy;
        case "title_change":

            stateCopy.title = action.payLoad;

            return stateCopy;
        default:

            return stateCopy;

    }

}

