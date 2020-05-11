import initialState from "../state"
import { LOCATION_CHANGE } from 'react-router-redux';

export function userReducer(state = initialState.userData, action) {

    let stateCopy = { ...state }
    switch (action.type) {
        case "authenticate_user":
            let { name, email, userName, avatar, id, subscribeds, subscribers, videos, bookmarkeds } = action.payLoad;
            stateCopy = { name, email, userName, avatar, id, subscribeds, subscribers, videos, bookmarkeds }
            return stateCopy;

        case "reset_state":
            stateCopy = {
                id: "",
                name: "",
                avatar: "",
                userName: "",
                email: "",
                subscribers: [],
                subscribeds: [],
                videos: [],
                bookmarkeds: []
            }
            return stateCopy;

        case LOCATION_CHANGE: {
            return stateCopy;
        }

        default:
            return stateCopy;
    }
}