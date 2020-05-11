import axios from "axios";


export const loginUser = async (data) => {
    return axios.post("https://amvapp.herokuapp.com/user/find", data).then(res => {
        return res;

    })

}

export const registerUser = (data) => {

    return axios.post("https://amvapp.herokuapp.com/user", data).then(res => {
        return res;

    })

}

export const verifyUserFromToken = (token) => {

    return axios.post("https://amvapp.herokuapp.com/user/verify", {}, {
        headers: { token: token }
    }).then(res => {
        return res;

    })


}

export const updateAvatar = (data , id) => {

    return axios.put(`https://amvapp.herokuapp.com/user/${id}`, data).then(res => {
        return res;

    })

}