import * as ApiAuth from "../../api/auth"

const formatData = (type, data) => {
    return {
        type,
        payLoad: data
    }
}


export const loginUser = (data) => {
    return dispatch => {
        return ApiAuth.loginUser(data).then(res => {
            if (res.data.token) {
                dispatch(formatData("authenticate_user", res.data.data))
                return res.data;
            }
            else {
                return null;
            }
        })

    }
}

export const registerUser = (data) => {
    return dispatch => {
        return ApiAuth.registerUser(data).then(res => {
            console.log("registyered", res)
            if (res.data.status) {
                dispatch(formatData("authenticate_user", res.data.data))
                return res.data;
            }
            else if (!res.data.status) {
                return res.data;
            }
            else {
                return null;
            }
        })

    }
}

export const verifyUser = (token) => {
    return dispatch => {
        return ApiAuth.verifyUserFromToken(token).then(res => {
            if (res.data.data) {
                dispatch(formatData("authenticate_user", res.data.data))
                return res.data;
            }
            else{
                return null;
            }
        })

    }
}

export const resetState = ()=>{
    return dispatch =>{
        dispatch(formatData("reset_state" , null))
    }
}

export const updateAvatar = (data , id) => {
    return dispatch => {
        return ApiAuth.updateAvatar(data , id).then(res => {
            return res
        })

    }
}

