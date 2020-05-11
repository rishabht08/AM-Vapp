import axios from "axios"

export const subscribe = async (data) => {
    axios.post("https://amvapp.herokuapp.com/subscribed", data).then(res => {
        let { user_id, others_id } = data
        let dataRev = {
            "user_id": others_id,
            "others_id": user_id
        }
        axios.post("https://amvapp.herokuapp.com/subscriber", dataRev).then(resp => {
            return resp
        })

    })
}

export const unSubscribe = async (data) => {
    axios.delete(`https://amvapp.herokuapp.com/subscribed/${data.subscribedId}`).then(res => {

        axios.delete(`https://amvapp.herokuapp.com/subscriber/${data.subscriberId}`).then(res => {
            return res;
        })
    })
}