import React from "react";
import "../styles/profile.css"
import { connect } from "react-redux"
import * as actionGenerator from "../store/actions/userAuthAction"
import * as videoAction from "../store/actions/videoActions"
import VideoGrid from "../components/common/videoGrid";
import { Modal, Button } from "react-bootstrap"
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getCroppedImg } from "./imageCrop/croppedImage"
import * as firebase from "firebase"
import axios from "axios"
import randomstring from "randomstring"
import swal from 'sweetalert'

class Profile extends React.Component {

    state = {
        userData: this.props.userData,
        show: false,
        name: "",
        userName: "",
        email: "",
        src: null,
        avatar: this.props.userData ? this.props.userData.avatar : null,
        isEdit: false,
        refresh: false,
        crop: {
            unit: '%',
            width: 30,
            aspect: 1 / 1,
        },

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

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                this.imageRef,
                crop,
                randomstring.generate({
                    length: 6,
                    charset: 'alphabetic'
                }) + ".jpg"
            )



            this.setState({ croppedImageUrl });
        }
    }

    handleCroppedImage = () => {

        this.setState({
            avatar: this.state.croppedImageUrl.imageUrl,
            show: false,
            src: null
        })

        let storageRef = firebase.storage().ref(`/${this.state.croppedImageUrl.blob.name}`);
        let imgTask = storageRef.put(this.state.croppedImageUrl.blob);

        imgTask.on("state_changed",
            (snapshot) => {



            },
            (error) => {
                console.log(error);

            },
            () => {

                firebase.storage().ref(`/${this.state.croppedImageUrl.blob.name}`).getDownloadURL().then(url => {
                    this.props.updateAvatar({ avatar: url, name: this.state.name, email: this.state.email }, this.state.userData.id).then(res => {
                        this.setState({
                            refresh: true
                        })
                    })



                })

            }
        )



    }

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };


    onFileTrigger = () => {
        this.setState({
            show: true
        })
    }

    onFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result, show: true })
            );
            reader.readAsDataURL(e.target.files[0]);
        }

    }

    handleAvatarChange = () => {

        document.getElementById('userAvatar').click();
        this.setState({
            show: false
        })


    }

    handleClose = () => {
        this.setState({
            show: false,
            src: null,
            avatar: null
        })

        this.props.updateAvatar({ avatar: null, name: this.state.name, email: this.state.email }, this.state.userData.id).then(res => {
            this.setState({})
        })

    }

    handleCloseHide = () => {
        this.setState({
            show: false,
            src: null,

        })

    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    updateProfile = () => {

        this.props.updateAvatar({ avatar: this.state.avatar, name: this.state.name, email: this.state.email }, this.state.userData.id).then(res => {
            console.log("updating all ", res)
            this.setState({
                refresh: true,
                isEdit: false
            })
        })


    }

    logOut = () => {
        localStorage.removeItem("token")
        this.props.resetState();
        swal("You're Logged Off Succesfully", "success").then(() => {

            this.props.history.push({
                pathname: '/',
            })

        });

    }



    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={() => this.handleCloseHide()} centered>

                    <Modal.Body>Update Your Avatar</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Remove Avatar
                        </Button>
                        <Button variant="primary" onClick={() => this.handleAvatarChange()}>
                            Chose from Your Device
                         </Button>
                    </Modal.Footer>
                </Modal>
                {this.state.src && (
                    <Modal show={this.state.show} onHide={() => this.handleClose()} centered>

                        <Modal.Body>
                            <ReactCrop
                                src={this.state.src}
                                crop={this.state.crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="info" onClick={() => this.handleCroppedImage()}>
                                Update
                        </Button>
                        </Modal.Footer>

                    </Modal>

                )}
                <div className="profileBody">

                    <div className="userProfile">
                        <div className="userImage" onClick={() => this.onFileTrigger()}>
                            <img src={this.state.avatar ? this.state.avatar : "https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg"} className="profileAvatar"></img>
                            <div className="changeAvatar">
                                <span>Change/Remove</span>
                            </div>
                        </div>
                        {this.state.isEdit == false &&
                            <div className="userDetails">
                                <div className="profileEdit" onClick={() => { this.setState({ isEdit: true }) }}>
                                    <span><i className="fas fa-edit"></i></span>
                                </div>
                                <p>{this.state.userData.name && this.state.userData.name}</p>
                                <p>{this.state.userData.userName && this.state.userData.userName}</p>
                                <p>{this.state.userData.email && this.state.userData.email}</p>
                                <p>Subscribers: {this.state.userData.name && this.state.userData.subscribers.length}</p>
                                {this.props.isProfile && <Button variant="info" onClick={() => this.logOut()}>
                                    Log Out
                                </Button>}
                            </div>}

                        {this.state.isEdit == true &&
                            <div className="userDetails">

                                <input id="name" type="text" value={this.state.name} onChange={(e) => { this.onChangeHandler(e) }} />
                                <input id="email" type="text" value={this.state.email} onChange={(e) => { this.onChangeHandler(e) }} />
                                <p>{this.state.userData.userName && this.state.userData.userName}</p>
                                <div className="editButtons">
                                    <button onClick={() => { this.updateProfile() }}>Update</button>
                                    <button onClick={() => { this.setState({ isEdit: false }) }}>Cancel</button>
                                </div>

                            </div>}
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

    console.log("state", state)
    let isProfile = false;
    if (ownProps.match.url === "/profile") {
        isProfile = true

    }
    return {
        userData: state.userReducer,
        isProfile
    }
}
const mapDispatchToProps = dispatch => {
    return {
        verifyUser: (token) => dispatch(actionGenerator.verifyUser(token)),
        getAllVideos: () => dispatch(videoAction.getAllVideos()),
        updateAvatar: (data, id) => dispatch(actionGenerator.updateAvatar(data, id)),
        resetState: () => dispatch(actionGenerator.resetState())

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);