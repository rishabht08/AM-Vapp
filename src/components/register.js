import React from 'react';
import { connect } from "react-redux"
import axios from "axios"

import "../styles/register.css";
import { Link } from 'react-router-dom'
import * as videoAction from "../store/actions/videoActions"
import swal from 'sweetalert';
import * as actionGenerator from "../store/actions/userAuthAction"


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            userName: "",
            email: "",
            password: "",
            rePassword: "",
            isSame: false,
            randomVideo: "",
            thumbnail: ""
        }

    }

    componentDidMount() {


        this.props.getAllVideos().then(res => {
            if (res.data.length!=0) {
                let arr = res.data;

                let i = Math.floor(Math.random() * arr.length)
                this.setState({
                    randomVideo: arr[i].url,
                    thumbnail: arr[i].thumbnail
                })
            }

        })

    }

    onChanngeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name == "rePassword") {
            if (e.target.value == this.state.password) {
                this.setState({
                    isSame: true
                })

            }
            else {
                this.setState({
                    isSame: false
                })
            }
        }


        if (e.target.name == "password") {
            if (e.target.value == this.state.rePassword) {
                this.setState({
                    isSame: true
                })

            }
            else {
                this.setState({
                    isSame: false
                })
            }
        }


    }

    onSubmit = () => {
        if (this.state.isSame) {
            let { name, email, userName, password } = this.state;
            let data = {
                name,
                email,
                userName,
                password
            }
            this.props.registerUser(data).then(res => {
                if (res.status == false) {

                    swal({
                        title: "Error!",
                        text: res.data,
                        icon: "error",
                        button: "Ok",
                    });

                }
                else {

                    swal({
                        title: "Succesfully Registered",
                        text: "You Can enjoy more services now",
                        icon: "success",
                        button: "Ok"
                    }).then(() => {
                        localStorage.setItem("token", res.token)
                        this.props.history.push("/")
                    })

                }
            })

        }
        else {
            alert("Password Dont Match")
        }

    }




    render() {
        return (
            <div>
                <video src={this.state.randomVideo}
                    className="video-bg" poster={this.state.thumbnail} autoPlay loop muted />

                <div className="wrapper">
                    <h1>Sign Up</h1>
                    <div className="register-area">
                        <input type="text" placeholder="Full Name" name="name" value={this.state.name} onChange={this.onChanngeHandler} autoComplete="off" />
                        <input type="text" placeholder="User Name" name="userName" value={this.state.userName} onChange={this.onChanngeHandler} autoComplete="off" />
                        <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.onChanngeHandler} autoComplete="off" />
                        <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChanngeHandler} autoComplete="off" />
                        <input type="password" placeholder="Re-Enter Password" className={this.state.isSame ? "rePass-g" : "rePass-r"} name="rePassword" onChange={this.onChanngeHandler} autoComplete="off" />
                        <div className="button-area" onClick={this.onSubmit}>Sign Up</div>
                        <p>Already have an Account?<a href="/login">Login</a></p>



                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        registerUser: (data) => dispatch(actionGenerator.registerUser(data)),
        getAllVideos: () => dispatch(videoAction.getAllVideos())

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
