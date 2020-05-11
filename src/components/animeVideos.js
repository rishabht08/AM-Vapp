import React from "react"
import { connect } from "react-redux"
import VideoGrid from "../components/common/videoGrid"
import * as videoAction from "../store/actions/videoActions"

class AnimeVideos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []

        }
    }

    componentDidMount = () => {
        this.getVideosByAnime(this.props.anime)   
    }

 
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.anime != this.props.anime){
            this.getVideosByAnime(nextProps.anime)
        }

    }

    getVideosByAnime = (anime) =>{
        this.props.getVideosByAnime(anime).then(res => {
            this.setState({
                videos: res.data
            })
        })

    }


    render() {
        return (
            <div>

        <div className="animeUploads">AMV's: {this.props.anime}</div>
                <VideoGrid videos={this.state.videos} />

            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    // console.log("props" , ownProps.match.params.id)

    return {
        anime: ownProps.match.params.anime,
        userData: state.userReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {


        getVideosByAnime: (anime) => dispatch(videoAction.getVideosByAnime(anime))


    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AnimeVideos);