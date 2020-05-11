import React from "react";
import { connect } from "react-redux"
import * as firebase from "firebase"
import Select from "./select";
import Files from "./files";
import Progress from "./progress"
import "../../styles/uploader.css"

import * as actionGenerator from "../../store/actions/userAuthAction"

class Uploader extends React.Component {

    componentDidMount() {
        if (localStorage.token) {
            const token = localStorage.token
            this.props.verifyUser(token).then(res => {
                if (res) {
                    this.setState({
                        name: res.data.name
                    })
                }
            })

            // axios.post("http://localhost:6060/user/verify", {}, {
            //     headers: { token: token }
            // }).then(res => {
            //     this.setState({
            //         name:res.data.data.name
            //     })

            // })

        }

    }

    changeRoute = () => {
        this.props.history.push("/")
    }
    render() {
        return (
            <div>
                <Select />
                <Files  />
                <Progress routeChange={() => this.changeRoute()} />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state)
    return {
        state: state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        verifyUser: (token) => dispatch(actionGenerator.verifyUser(token)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);