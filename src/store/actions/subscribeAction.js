
import * as ApiSub from "../../api/subscribe"


const formatData = (type, data) => {
    return {
        type,
        payLoad: data
    }
}


export const subscribe = (data) => {

    return dispatch => {
        return ApiSub.subscribe(data).then(res => {
            return res;

        })

    }

}

export const unSubscribe = (data) => {

    return dispatch => {
        return ApiSub.unSubscribe(data).then(res => {
            return res;

        })

    }

}




