import React from 'react';
import axios from "axios"
import "../styles/player.css"
import { connect } from "react-redux"
import * as videoAction from "../store/actions/videoActions"
import * as commentAction from "../store/actions/commentAction"
import * as subscribeAction from "../store/actions/subscribeAction"
import VideoGrid from "../components/common/videoGrid"
import swal from 'sweetalert';
import { Modal, Button } from "react-bootstrap"
import * as actionGenerator from "../store/actions/userAuthAction"
import UserProfile from "./userProfile"



class Player extends React.Component {

    state = {
        videos: [],
        thumbnail: null,
        url: null,
        comments: [],
        comment: "",
        refresh: false,
        videoUser: "",
        show: false,
        title: "",
        anime: "",
        avatar: null,
        subscribersLen: "",
        vidUserId: "",
        subscribed: false,
        subscribers: [],
        modal: null,


    }
    componentDidMount() {

        this.getVideoById(this.props.videoId);


    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.videoId != nextProps.videoId || this.props.userData.subscribeds.length != nextProps.userData.subscribeds.length) {

            this.getVideoById(nextProps.videoId)
        }

    }
    componentDidUpdate = (prevProp, prevState) => {
        if (prevState.comments.length != this.state.comments.length || this.state.refresh == true) {

            console.log("refresh")
            setTimeout(() => {
                this.getVideoById(prevProp.videoId)

            }, 1500)


        }
        if (this.state.refresh == true) {
            this.getVideoById(prevProp.videoId)

        }

    }

    getVideoById = (id) => {

        if (localStorage.token) {
            const token = localStorage.token
            this.props.verifyUser(token).then(res => {

                if (res) {
                    this.setState({

                        isLoggedIn: true
                    })
                }
            })


        }
        this.props.getVideoById({ id: id }).then(res => {
            console.log("vid resp", res)
            let views = res.data.views + 1;

            this.props.updateVideoView({ views }, res.data.id).then(res => {
                console.log("Updated views", res)
            })


            this.setState({
                videos: res.data.user.videos,
                thumbnail: res.data.thumbnail,
                url: res.data.url,
                comments: res.data.comments.slice().reverse(),
                comment: "",
                refresh: false,
                title: res.data.title,
                anime: res.data.anime,
                avatar: res.data.user.avatar,
                videoUser: res.data.user.userName,
                subscribers: res.data.user.subscribers,
                subscribersLen: res.data.user.subscribers.length,
                vidUserId: res.data.user.id,
                modal: res.data.user

            })

            let len = this.props.userData.subscribeds.length;
            for (let i = 0; i < len; i++) {
                if (this.props.userData.subscribeds[i].others.userName == this.state.videoUser) {
                    this.setState({
                        subscribed: true
                    })
                    return;
                }
            }


        })
        this.scrollUp()
    }
    onchangeHandler = (e) => {
        this.setState({
            comment: e.target.value
        })
    }
    onEnterComment = (e) => {
        if (e.key == "Enter") {
            if (this.state.comment != "") {
                const data = {

                    "video_id": this.props.videoId,
                    "user_id": this.props.userData.id,
                    text: this.state.comment

                }

                this.props.commentToVideo(data).then(res => {
                    this.getVideoById(this.props.videoId)
                    this.setState({
                        refresh: true
                    })

                })

            }
        }
    }

    isCommentAuthority = (index) => {

        if (this.state.comments[index].user.userName == this.props.userData.userName || this.props.userData.userName == this.state.videoUser) {
            return true;
        }
        return false;

    }

    deleteComment = (index) => {

        swal({
            title: "Are you sure?",
            text: "Your Comment will be deleted permanently",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let id = this.state.comments[index].id;
                    this.props.deleteComment(id).then(res => {
                        this.setState({
                            refresh: true
                        })
                        swal("Poof! Your Comment has been deleted!", {
                            icon: "success",
                        });
                    })

                } else {

                }
            });

    }

    onSubscribe = () => {
        if (this.state.subscribed == false) {
            const data = {
                "others_id": this.state.vidUserId,
                "user_id": this.props.userData.id

            }
            this.props.subscribe(data).then(res => {
                this.setState({
                    subscribed: true
                })
                this.getVideoById(this.props.videoId)
            })
        }
        else {
            let len = this.props.userData.subscribeds.length;
            let subscribedId = null;
            let subscriberId = null;

            for (let i = 0; i < len; i++) {
                if (this.props.userData.subscribeds[i]["others_id"] == this.state.vidUserId) {
                    subscribedId = this.props.userData.subscribeds[i].id;
                    console.log("subscribedId", subscribedId)
                    break;
                }
            }

            let lenSub = this.state.subscribers.length
            for (let i = 0; i < lenSub; i++) {
                if (this.state.subscribers[i]["others_id"] == this.props.userData.id) {
                    subscriberId = this.state.subscribers[i].id;
                    console.log("subscriberId", subscriberId)
                    break;
                }
            }

            const data = {
                subscribedId,
                subscriberId
            }

            //Call Unsubscribe
            this.props.unSubscribe(data).then(res => {
                this.setState({
                    subscribed: false
                })
                this.getVideoById(this.props.videoId)

            })

        }
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    goToAnimeVideo = (anime) => {
        window.location = `/video/anime/${anime}`
    }

    scrollUp  = () => {
        document.body.scrollTo({ top: 0, behavior: "smooth" });
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    }


    render() {
        return (
            <div>

                <Modal show={this.state.show} onHide={() => this.setState({ show: false })}
                    size="lg"
                    dialogClassName="modal-90w"

                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Body>
                        <UserProfile user={this.state.modal && this.state.modal} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                            Close
                        </Button>

                    </Modal.Footer>

                </Modal>

                <div className="videoDashboard">
                    <figure className="vidWrapper" id="videoContainer" data-fullscreen="false">

                        <video id="video" autoPlay controls preload="metadata" src={this.state.url && this.state.url} type="video/mp4" poster={this.state.thumbnail && this.state.thumbnail} >
                            {/* <source src={this.state.url && this.state.url} type="video/mp4"/> */}
                            {/* <source src="https://storage.coverr.co/videos/TEerln00m5BX5hsDYavm12mzBSO3YPlKR?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTg2MzY1MjYxfQ.YpmaRauiHKL6SBynrv3tXuxtCaKlk-ZN8tLiyhC2_Gs" /> */}

                        </video>

                    </figure>

                    <div className="videoComments">
                        {this.props.userData.name != "" ?
                            <input type="text" className="input-group" placeholder="Place Comment" onChange={(e) => this.onchangeHandler(e)} value={this.state.comment} onKeyDown={(e) => this.onEnterComment(e)} /> :
                            <p className="commentLogin"><a href="/login" >Login</a> to Comment</p>
                        }


                        {this.state.comments.length != 0 && this.state.comments.map((comment, index) => (

                            <div className="comment">

                                <img className="commentAvatar" src={comment.user.avatar ? comment.user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}></img>

                                <div className="mainComment">
                                    <span>{comment.user.name}</span>
                                    <span>{comment.text}</span>
                                </div>
                                {this.isCommentAuthority(index) &&
                                    <div className="deleteComment" onClick={() => this.deleteComment(index)}>
                                        <span><i className="fas fa-trash"></i></span>
                                    </div>}
                            </div>

                        ))}


                    </div>

                </div>
                <div className="vidDetails">
                    <div className="videoTitle">
                        <div className="animeTitle">
                            <span >{this.state.title}</span>
                        </div>
                        <div className="vidAnime" onClick={() => this.goToAnimeVideo(this.state.anime)}>
                            <span >#{this.state.anime}</span>
                        </div>

                    </div>
                    <div className="videoAuthor">

                        <img src={this.state.avatar ? this.state.avatar : "https://www.w3schools.com/howto/img_avatar.png"} className="authorAvatar"></img>
                        <div className="AuthDetails">

                            <span className="vidUserName" onClick={() => this.setState({ show: true })}><b>{this.state.videoUser}</b></span>
                            <span style={{ color: "grey" }}>{this.state.subscribersLen} Subscribers</span>
                        </div>
                        {this.state.videoUser != this.props.userData.userName && this.props.userData.name!="" &&
                            <div className="subscribe">

                                <Button variant="outline-warning" onClick={() => { this.onSubscribe() }}>{this.state.subscribed ? "Subscribed" : "Subscribe"}</Button>

                            </div>}

                    </div>

                </div>


                {this.state.videos.length != 0 &&
                    <VideoGrid videos={this.state.videos} />}

                {/* {this.state.show && <div className="onTop">
                    <Login/>
                    </div>} */}
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log("props" , ownProps.match.params.id)

    return {
        videoId: ownProps.match.params.id,
        userData: state.userReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {


        getVideoById: (id) => dispatch(videoAction.getVideoById(id)),
        updateVideoView: (view, id) => dispatch(videoAction.updateVideoView(view, id)),
        commentToVideo: (data) => dispatch(commentAction.commentToVideo(data)),
        deleteComment: (id) => dispatch(commentAction.deleteComment(id)),
        subscribe: (data) => dispatch(subscribeAction.subscribe(data)),
        unSubscribe: (data) => dispatch(subscribeAction.unSubscribe(data)),
        verifyUser: (token) => dispatch(actionGenerator.verifyUser(token)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
