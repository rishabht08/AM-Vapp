import React from "react"
import { Spinner } from "react-bootstrap"
import { connect } from "react-redux";
import * as bookmarkAction from "../../store/actions/videoActions"
import * as actionGenerator from "../../store/actions/userAuthAction"
import { Link } from "react-router-dom";

class VideoGrid extends React.Component {

    state = {
        loadIndex: [],
        bookmarkedVideoId: []
    }

    componentDidMount() {
        let loadIndex = this.state.loadIndex;
        this.props.videos.forEach((element, index) => {
            loadIndex[index] = 0;
        })
        let bookmarkedVideoId = this.props.bookmarked.map(elem => {
            return elem.video.id
        })
        console.log("bookmarkedVideoId", bookmarkedVideoId)

        this.setState({
            loadIndex: loadIndex,
            bookmarkedVideoId

        })

    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.bookmarked.length != nextProps.bookmarked.length) {

            let bookmarkedVideoId = nextProps.bookmarked.map(elem => {
                return elem.video.id
            })


            this.setState({
                bookmarkedVideoId
            })
        }
    }

    updateUser = () => {
        if (localStorage.token) {
            const token = localStorage.token
            this.props.verifyUser(token).then(res => {

                if (res) {
                    this.setState({
                        userData: res.data,
                        isLoggedIn: true
                    })
                }
            })


        }
    }

    isBookmarked = (index) => {


        if (this.state.bookmarkedVideoId.indexOf(this.props.videos[index]["video_id"] == undefined ? this.props.videos[index].id : this.props.videos[index]["video_id"]) != -1) {
            return true;
        }
        return false

    }

    onBookmark = (index) => {
        if (this.props.userData.name == "") {
            alert("Login First")
        }
        else {
            if (this.isBookmarked(index)) {
                let bookIndex = this.state.bookmarkedVideoId.indexOf(this.props.videos[index]["video_id"] == undefined ? this.props.videos[index].id : this.props.videos[index]["video_id"])
                this.props.unBookmarkVideo(this.props.bookmarked[bookIndex].id).then(res => {
                    this.updateUser()
                })

            }
            else {
                let data = {
                    "user_id": this.props.userData.id,
                    "video_id": this.props.videos[index]["video_id"] == undefined ? this.props.videos[index].id : this.props.videos[index]["video_id"]
                }
                this.props.bookmarkVideo(data).then(res => {
                    this.updateUser()

                })

            }
        }

    }

    onImageLoad = (index) => {
        let loadIndex = this.state.loadIndex;
        loadIndex[index] = 1
        this.setState({
            loadIndex
        })
    }
    render() {

        return (
            <div className="video-grid">
                {this.props.videos.length != 0 && this.props.videos.map((video, index) => (

                    <div className="video-list">
                        <div className="video-content">
                            {this.state.loadIndex[index] == 0 && <Spinner className="loadSpinner" animation="grow" variant="success" />}

                          
                            <img src={video.thumbnail} onLoad={() => this.onImageLoad(index)} style={{ opacity: this.state.loadIndex[index] == 0 ? "0" : "1" }} />
                        <span><b>{video.title}</b></span>
                        <span>{video.anime}</span>



                        <div className="author">
                            <span>{video.users ? video.users.name : video.user.name}</span>
                            <span><i class="fas fa-eye"></i> {video.views}</span>
                            <div className="videoBookmark" onClick={() => this.onBookmark(index)}><span><i className={this.isBookmarked(index) ? "fas fa-bookmark fa-lg" : "far fa-bookmark fa-lg"}></i></span></div>
                        </div>
                    </div>
                    <Link to={`/player/${this.props.videos[index]["video_id"] == undefined ? this.props.videos[index].id : this.props.videos[index]["video_id"]}`} className="linkPlayer">
                    <div className="showPlay">
                        <span><i class="far fa-play-circle fa-6x"></i></span>
                    </div></Link>
                    </div>
        ))
    }

            </div>
        )
    }
}

const mapStateToProps = (state) => {


    return {
        bookmarked: state.userReducer.bookmarkeds,
        userData: state.userReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // verifyUser: (token) => dispatch(actionGenerator.verifyUser(token)),
        // getAllVideos: () => dispatch(videoAction.getAllVideos()),
        // updateAvatar: (data, id) => dispatch(actionGenerator.updateAvatar(data, id))
        bookmarkVideo: (data) => dispatch(bookmarkAction.bookmarkVideo(data)),
        unBookmarkVideo: (id) => dispatch(bookmarkAction.unBookmarkVideo(id)),
        verifyUser: (token) => dispatch(actionGenerator.verifyUser(token)),


    }

}

export default connect(mapStateToProps, mapDispatchToProps)(VideoGrid);