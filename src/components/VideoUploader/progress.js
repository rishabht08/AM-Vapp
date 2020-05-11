import React from "react";
import { connect } from "react-redux"
import "../../styles/uploader.css"
import swal from 'sweetalert'

class Progress extends React.Component {

    showSuccess = () =>{
        swal("VideoUploaded", "success").then(()=>{
            this.props.routeChange()
        })
    }


    render() {
        return (
            <div>
                <div className="prog">
                    {this.props.vidPercent !== 100 && this.props.vidFile != "" ?
                        <div className="videoUploading">
                            <p>Processing Video:</p>
                            <span>Please Wait</span>
                            {/* <progress id="fileV" value={this.props.vidPercent} max="100" /> */}

                            <div className="progress">
                                <div className="progress-bar bg-warning" role="progressbar" style={{ "width": `${this.props.vidPercent}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">{this.props.vidPercent}</div>
                            </div>
                        </div> :
                        <div>
                        </div>}
                    {this.props.imgPercent > 0 &&

                        <div className="videoUploading">
                            <p>Uploading Video</p>
                            <span>Please Wait</span>
                            {/* <progress id="file" value={this.props.imgPercent} max="100">  </progress> */}
                            <div className="progress mb-5">
                                <div className="progress-bar bg-info" role="progressbar" style={{ "width": `${this.props.imgPercent}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">{this.props.imgPercent}</div>
                            </div>
                        </div>}
                    {this.props.imgPercent == 100 &&
                        this.showSuccess()
                        // <div>
                        //     <div className="alert alert-success" role="alert">
                        //         Files Uploaded!!!
                        // </div>

                        // </div>
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let { imgPercent, vidPercent, vidFile, captured } = state.vidUploaderReducer
    return {
        imgPercent,
        vidPercent,
        vidFile,
        captured

    }

}


export default connect(mapStateToProps)(Progress);