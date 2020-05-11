import React from "react";
import "../styles/profile.css"
import { connect } from "react-redux"
import * as actionGenerator from "../store/actions/userAuthAction"
import * as videoAction from "../store/actions/videoActions"
import VideoGrid from "../components/common/videoGrid";


import 'react-image-crop/dist/ReactCrop.css';


class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            show: false,
            name: "",
            userName: "",
            email: "",
            src: null,
            avatar: this.props.userData ? this.props.userData.avatar : null,
            isEdit: false,
            refresh: false

        }
    }

    componentDidMount() {
        this.setState({

            name: this.props.userData.name,
            userName: this.props.userData.userName,
            email: this.props.userData.email,
            avatar: this.props.userData.avatar
        })

    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.userData) {
            this.setState({
                userData: nextProps.userData,
                name: nextProps.userData.name,
                userName: nextProps.userData.userName,
                email: nextProps.userData.email,
                avatar: nextProps.userData.avatar
            })
        }

    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.refresh == true) {
            const token = localStorage.token
            this.props.verifyUser(token).then(res => {

                if (res) {
                    this.setState({
                        refresh: false,
                        name: this.props.userData.name,
                        userName: this.props.userData.userName,
                        email: this.props.userData.email,
                        avatar: this.props.userData.avatar
                    })
                }
            })
        }
    }



    render() {
        return (
            <div>


                <div className="profileBody">

                    <div className="userProfile">
                        <div className="userImage" >
                            <img src={this.state.avatar ? this.state.avatar : "https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg"} className="profileAvatar"></img>
                            \
                        </div>

                        <div className="userDetails">

                            <p>{this.state.userData.name && this.state.userData.name}</p>
                            <p>{this.state.userData.userName && this.state.userData.userName}</p>
                            <p>{this.state.userData.email && this.state.userData.email}</p>
                            <p>Subscribers: {this.state.userData.name && this.state.userData.subscribers.length}</p>
                        </div>


                    </div>
                    <div className="userUploads">Uploads</div>
                    <div className="userVideos">
                        {this.state.userData.videos.length != 0 &&
                            <VideoGrid videos={this.state.userData.videos} />}
                    </div>

                </div>

                <input type="file" id="userAvatar" onChange={(e) => this.onFileSelect(e)} style={{ opacity: "0" }}></input>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("ownProps", ownProps)
    return {
        userData: ownProps.user
    }
}
const mapDispatchToProps = dispatch => {
    return {

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);