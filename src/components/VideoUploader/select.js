import React from "react";
import { connect } from "react-redux"
import "../../styles/uploader.css"
import * as actionGenerator from "../../store/actions/videoUploadActions"

class Select extends React.Component {

    onChangeHandler(event) {

        this.props.changeAnime("anime_change", event.target.value)
    }

    onTitleChangeHandler(event) {

        this.props.changeTitle("title_change", event.target.value)
    }
    render() {
        return (
            <div>
                {this.props.vidFile == "" ?
                    <div className="uploader">>
                        <h1>Upload AMV</h1>
                        <div className="upload slct">
                            <label for="anime"><b>Anime</b></label>
                            <input type="text" className="input-group" id="anime" placeholder="Anime Name" value={this.props.anime} onChange={(e) => this.onChangeHandler(e)} />
                            <label for="title"><b>Title</b></label>
                            <div className="input-title">
                                <input type="text" className="input-group" id="title" placeholder="Video Title" value={this.props.title} onChange={(e) => this.onTitleChangeHandler(e)} />
                            </div>
                        </div>
                    </div> :
                    <div>
                    </div>}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeAnime: (type, data) => dispatch(actionGenerator.changeAnime(type, data)),
        changeTitle: (type, data) => dispatch(actionGenerator.changeTitle(type, data))
    }

}

const mapStateToProps = (state) => {
    let { vidFile, title, anime } = state.vidUploaderReducer
    return {
        vidFile,
        title,
        anime

    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Select);