import React from 'react';
import { connect } from "react-redux"
import axios from "axios"
import swal from 'sweetalert';
import Unsplash from 'unsplash-js';

import "../styles/login.css";
import { Link } from 'react-router-dom'

import * as actionGenerator from "../store/actions/userAuthAction"

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            password: ""
        }
    }

    onChanngeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    onSubmit = () => {
        let { userName, password } = this.state;
        let data = {
            userName,
            password
        }
        this.props.loginUser(data).then(res => {
            if (!res || !res.token) {
                swal({
                    title: "No User Found",
                    text: "Enter Credentials Again",
                    icon: "error",
                    button: "Ok",
                });

            }
            else {
                console.log(res.token)
                swal({
                    title: "Succesfully Signed In",
                    text: `Signed In As ${res.data.name}`,
                    icon: "success",
                    button: "Ok"
                }).then(() => {
                    localStorage.setItem("token", res.token)
                    this.props.history.goBack()
                })

            }
        })

    }


    render() {

        return (
            <div>
                <video src="https://storage.coverr.co/videos/KP78n9EWQAje1fm6Xr02N6zm7V01xxNRNK?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTg2NDQxMDE4fQ.YDmrRzOPt76msPcPwsgtvcp2Jt8OT14LqWB5OafgIhw"
                    className="video-bg" autoPlay loop muted />
                  

                <div className="wrapper">
                    <h1>Log In</h1>
                    <div className="login-area">
                        <input type="text" placeholder="User Name" name="userName" value={this.state.userName} onChange={this.onChanngeHandler} />
                        <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChanngeHandler} />
                        <div className="button-area" onClick={this.onSubmit}>LogIn</div>

                        <p>Don't have an Account?<a href="/signup">SignUp</a></p>
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
        loginUser: (data) => dispatch(actionGenerator.loginUser(data)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
