import React from "react";
import Sidebar from "react-sidebar";
import "../styles/sidebar.css"
import { Link } from 'react-router-dom'
import * as firebase from "firebase";
import * as actionGenerator from "../store/actions/userAuthAction"
import { connect } from "react-redux";
import { Button } from "react-bootstrap"
import logo from "../icons/logo.png"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


class ToogleSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            animePath: [],
            isLoggedIn: false,
            userData: null,
            test: ["Naruto", "Bleach", "Attack On Titan", "One punch Man", "Your Name"]
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    componentDidMount() {


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

        if (!localStorage.token) {
            console.log("token", localStorage.token)
        }


        let storageRef = firebase.storage().ref('/');
        storageRef.listAll().then((res) => {
            this.setState({
                animePath: res.prefixes
            })


        });
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.state.userData && this.state.userData.avatar != nextProps.userData.avatar || this.state.userData && this.state.userData.videos.length != nextProps.userData.videos.length) {
            this.setState({
                userData: nextProps.userData
            })


        }
        if (nextProps.userData.name != this.props.userData.name) {
            this.setState({
                userData: nextProps.userData
            })

        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log("component updatin", prevProps.userData.name, this.props.userData.name)
        if (prevProps.userData.name != this.props.userData.name) {
            if (this.props.userData.name == "") {
                this.setState({
                    isLoggedIn: false
                })

            }
            this.setState({
                userData: this.props.userData
            })
        }

    }

    onSetSidebarOpen(open) {
        if (open == false) {
            document.body.style.overflow = "auto";
        }
        else {
            document.body.style.overflow = "hidden";

        }
        this.setState({ sidebarOpen: open });
    }



    render() {
        return (
            <div className="sidebar-head">
                <div className="header-top">
                    <div className="sidebar-span">
                        <span onClick={() => this.onSetSidebarOpen(true)}><i className="fas fa-list fa-2x"></i></span>
                    </div>

                    <div className="app-logo">
                        <Link to="/"> <img src={logo}></img> </Link>
                    </div>
                    {/* <input className="input-group" placeholder="Search" /> */}
                    <Autocomplete
                        id="clear-on-escape"
                        clearOnEscape
                        options={this.state.test}
                        getOptionLabel={(option) => option}
                        style={{ width: "30%"," margin-top": "8px" , "color":"white !important" }}
                        onChange={(e)=>console.log("fsadjkf" , e.target.value)}
                   
                        renderInput={(params) => <TextField {...params}  margin="normal" placeholder="Search Anime"/>}
                    />

                




     
                    <Link to={this.state.isLoggedIn ? "/upload" : "/login"} className="header-video"><span ><i className="fas fa-video fa-2x"></i></span></Link>
                    {this.state.isLoggedIn ?
                        <Link to="/profile" className="header-image"> <img src={this.state.userData.avatar ? this.state.userData.avatar : "https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg"}  ></img> </Link> : <Link to="/login" className="header-login"><Button variant="info">
                            Login
                  </Button></Link>}
                </div>
                <Sidebar className="sideBar-main"
                    sidebar={<div className="sidebarElems">
                        {this.state.isLoggedIn &&
                            <div className="sidebar-para-1">
                                <Link to="/subscriptions" style={{ textDecoration: "none", color: "white" }}><div className="sidebar-para" onClick={() => this.setState({ sidebarOpen: false })}>
                                    <div className="rounded-letter"><i className="fas fa-users"></i></div>
                                    <span>Subscribed</span>
                                </div> </Link>
                                <Link to="/bookmarked" style={{ textDecoration: "none", color: "white" }}><div className="sidebar-para" onClick={() => this.setState({ sidebarOpen: false })} >
                                    <div className="rounded-letter"><i className="fas fa-bookmark"></i></div>
                                    <span>Bookmarked</span>
                                </div> </Link>
                            </div>}

                        <h2>Anime</h2>
                        {
                            this.state.animePath.map(item => (
                                <div className="sidebar-para">
                                    <div className="rounded-letter">{item.location.path[0]}</div>
                                    <span>{item.location.path}</span>
                                </div>

                            ))
                        }

                    </div >}

                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { background: "#373a3c", color: "white", width: "15rem", overflow: "auto", "z-index": "3" }, root: { top: "3rem", overflow: "hidden", "z-index": this.state.sidebarOpen && "3" } }}

                >

                </Sidebar >
            </div >
        );
    }
}


const mapStateToProps = (state) => {

    return {
        userData: state.userReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        verifyUser: (token) => dispatch(actionGenerator.verifyUser(token)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ToogleSideBar);
