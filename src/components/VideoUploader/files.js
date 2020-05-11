import React from "react";
import { connect } from "react-redux"
import * as firebase from "firebase"
import "../../styles/uploader.css";
import * as actionGenerator from "../../store/actions/videoUploadActions"


class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: "",
            image: "",
            captureButton: false
        }

    }

    componentDidUpdate = (prevProps, prevState) => {

        if (prevProps.vidFile !== this.props.vidFile) {
            this.setState({
                video: "",
                image: "",
                captureButton: false
            })

        }


    }

    onCapture = () => {
        const canvas = this.refs.canvas
        const video = this.refs.video
        // const ctx = canvas.getContext("2d")
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        canvas.toBlob((blob) => {
            this.setState({
                image: blob
            });
            // this.props.dispatch({
            //     type: "blob",
            // })
            this.props.changeAnime("blob", null)
        })



    }
    onCaptureSubmit = () => {

        // canvas.toBlob((blob) => {
        //     // const img = new Image();
        //     // img.crossOrigin = "Anonymous";
        //     // // img.src = window.URL.createObjectUrl(blob);
        //     // let src = window.URL.createObjectURL(blob);
        //     // console.log(src)
        let blob = this.state.image;
        blob.name = this.props.vidFile.name.split(".")[0];
        let title;
        if (this.props.title == "") {
            title = "No Title"

        }
        else {
            title = this.props.title
        }
        let storageRef = firebase.storage().ref(`/${this.props.anime}/${title}/${blob.name}`);
        let imgTask = storageRef.put(blob);

        imgTask.on("state_changed",
            (snapshot) => {

                let percentage = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                this.props.changeAnime("img_uploading", percentage)

            },
            (error) => {
                console.log(error);

            },
            () => {

                firebase.storage().ref(`/${this.props.anime}/${title}/${blob.name}`).getDownloadURL().then(url => {

                    console.log("user_id", this.props.userId, this.props.anime, title)

                    let data = {
                        title: title,
                        anime: this.props.anime,
                        "user_id": this.props.userId,
                        url: this.state.video,
                        thumbnail: url
                    }

                    this.props.createVideo(data).then(res => {
                        console.log("uploaded return" , res)
                        this.props.changeAnime("remove_captured", null)
                        console.log("uploaded")
                            this.props.changeAnime("reset", null)
                            // this.props.routeChange()


                        

                    })

                })

            }
        )

    }

    onImageSelect = (event) => {

    }

    onVideoSelect = (event) => {
        //vid storage 
        if (event.target.files) {
            let vid = event.target.files[0];
            let title;
            if (this.props.title == "") {
                title = "No Title"

            }
            else {
                title = this.props.title
            }
            let vidStorageRef = firebase.storage().ref(`/${this.props.anime}/${title}/${vid.name}`);
            let vidTask = vidStorageRef.put(vid);
            vidTask.on("state_changed",
                (snapshot) => {

                    let percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    // this.props.dispatch({
                    //     type: "vid_uploading",
                    //     payLoad: percentage
                    // })
                    this.props.changeAnime("vid_uploading", percentage)


                },
                (error) => {
                    console.log(error);

                },
                () => {
                    firebase.storage().ref(`/${this.props.anime}/${title}/${this.props.vidFile.name}`).getDownloadURL().then(url => {

                        this.setState({
                            video: url,
                            captureButton: true
                        })

                    })

                }
            )

            // this.props.dispatch({
            //     type: "video_selected",
            //     payLoad: event.target.files[0]
            // })
            this.props.changeAnime("video_selected", event.target.files[0])
        }

    }

    // async storageStuff() {

    //     // Create a reference under which you want to list
    //     var listRef = firebase.storage().ref().child("/");


    //     // Find all the prefixes and items.
    //     let arr = listRef.listAll().then((res) => {

    //         return res.prefixes;
    //         // res.items.forEach(function (itemRef) {
    //         //     // All the items under listRef.

    //         // });
    //     }).catch(function (error) {
    //         // Uh-oh, an error occurred!
    //     });

    //     let abc = await arr;
    //     return abc;
    // }

    // checkClick = () => {
    //     this.storageStuff().then(res => {
    //     let name = res[0].name;

    //         res[0].listAll().then(res => {
    //             // res.items.forEach((itemRef) => {
    //             //     console.log("items--->", itemRef)
    //             // }
    //             firebase.storage().ref().child(`/${name}/${res.items[3].name}`).getDownloadURL().then(url => {
    //                 console.log("link===>", url);
    //             })

    //         })


    //     }).catch(function (error) {
    //         // Uh-oh, an error occurred!
    //         console.log(error);

    //     });


    // }
    render() {
        return (
            this.props.vidFile == "" ?
                <div className="uploaderVidFile" >
                    <label className="files-upld"><b>Upload Video</b></label>
                    <div className="input-group mb-3">

                        {/* <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div> */}
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" onChange={(e) => this.onVideoSelect(e)} required />
                            <label className="custom-file-label" for="inputGroupFile01">{this.props.vidFile ? this.props.vidFile.name : "Select Video"}</label>
                        </div>
                    </div>


                </div> : <div>{this.props.imgPercent <= 1 && this.props.vidPercent == 100 ?
                    <div className="upload">
                        <h2>Take Snippet</h2>
                        <div className="capture-column">
                            <div className="capture">
                                <video ref="video" src={this.state.video} type="video/mp4" controls />
                                <canvas ref="canvas" />
                            </div>
                            {this.state.captureButton &&
                                <div className="captureButton">  <button className="btn btn-dark mt-3 mb-3" onClick={() => this.onCapture()}>Capture Image</button> </div>}
                            {this.state.image !== "" ? <div className="vidPicSubmit"> <button className="btn btn-warning mt-3" onClick={() => this.onCaptureSubmit()}>Submit</button> </div>
                                : <div></div>}
                        </div>


                    </div> : <div></div>}
                </div>




        )
    }
}


const mapStateToProps = (state) => {
    let { imgPercent, vidPercent, title, vidFile, anime, imgFile } = state.vidUploaderReducer
    let userId = state.userReducer.id;
    console.log("state", state)
    return {
        anime,
        vidFile,
        imgFile,
        title,
        imgPercent,
        vidPercent,
        userId
    }

}

const mapDispatchToProps = dispatch => {
    return {
        changeAnime: (type, data) => dispatch(actionGenerator.changeAnime(type, data)),
        createVideo: (data) => dispatch(actionGenerator.createVideo(data)),
        createThumbnail: (data) => dispatch(actionGenerator.createThumbnail(data))

    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Files);