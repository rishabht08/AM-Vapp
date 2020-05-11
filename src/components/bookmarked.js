import React from "react"
import { connect } from "react-redux";
import VideoGrid from "../components/common/videoGrid";
import "../styles/bookmarked.css"

class Bookmarked extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookmarkedVideos: []
        }
    }


    componentDidMount = () => {
        let bookmarkedVideos = this.props.bookmarked.map(elem => {
            return elem.video
        })
        this.setState({
            bookmarkedVideos
        })
    }

    componentWillReceiveProps = (nextProps) => {
     
        if (this.props.bookmarked.length != nextProps.bookmarked.length) {
           
            let bookmarkedVideos = nextProps.bookmarked.map(elem => {
                return elem.video
            })
            console.log("after loop" , bookmarkedVideos)
            this.setState({
                bookmarkedVideos
            })
        }
    }
    render() {
        return (
            <div className="bookmarkedGrid">
                <div className="bookmarkText">Bookmarked</div>
                <VideoGrid videos={this.state.bookmarkedVideos} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
   

    return {
        bookmarked: state.userReducer.bookmarkeds
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // verifyUser: (token) => dispatch(actionGenerator.verifyUser(token)),
        // getAllVideos: () => dispatch(videoAction.getAllVideos()),
        // updateAvatar: (data, id) => dispatch(actionGenerator.updateAvatar(data, id))

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarked);