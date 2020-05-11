import React from 'react';

import './App.css';
import Home from "./components/home"
import Register from "./components/register"
import Login from "./components/login"
import Uploader from "./components/VideoUploader/index"
import Player from "./components/player"
import Profile from "./components/profile"
import { connect } from "react-redux";
// import HeaderNav from './containers/HeaderNav/HeaderNav';
// import { SideBar } from './containers/SideBar/SideBar';
// import { VideoGrid } from './components/VideoGrid/VideoGrid'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SidebarExampleTarget from "./components/sidebar"
import Bookmarked from "./components/bookmarked"
import Subscriptions from "./components/subscriptions"
import AnimeVideos from "./components/animeVideos"


class App extends React.Component {
  state = {
    currentPath: null
  }
  componentDidMount = () => {

    let currentPath = window.location.pathname
    this.setState({
      currentPath
    })
  }


  // ifPlaceChanged = ()=>{
  //   let currentPath =  window.location.pathname
  //   console.log("current Path" , currentPath)
  //   console.log("state path" , this.state.currentPath)
  //   if(currentPath != this.state.currentPath){
  //     console.log("currrpath" , currentPath)

  //     this.setState({
  //       currentPath
  //     })
  //   }
  // }
  render() {

    return (
      <Router>
        <div>
          {/* {this.ifPlaceChanged()} */}
          {this.state.currentPath !== "/login" && this.state.currentPath !== "/signup" ?
            <Route path="/"   component={SidebarExampleTarget}></Route>: <div>
            </div>}
          {/* <Switch> */}

          <Route path="/" exact component={Home}>
          </Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/signup" exact component={Register}></Route>
          <Route path="/upload" exact component={Uploader}></Route>
          <Route path="/player/:id" exact component={Player}></Route>
          <Route path="/profile" exact component={Profile}></Route>
          <Route path="/bookmarked" exact component={Bookmarked}></Route>
          <Route path="/subscriptions" exact component={Subscriptions}></Route>
          <Route path="/video/anime/:anime" exact component={AnimeVideos}></Route>
          {/* </Switch> */}

        </div>
      </Router>
    )
  }
}




// export default App;
const mapStateToProps = (state, ownProps) => {


  return {
    userData: state.userReducer,

  }
}
const mapDispatchToProps = dispatch => {
  return {


  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);