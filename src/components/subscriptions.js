import React from "react"
import { Row, Col, Container, Image, Modal, Badge, Button } from "react-bootstrap"
import "../styles/subscriptions.css";
import { connect } from "react-redux";
import UserProfile from "./userProfile"
import * as subscribeAction from "../store/actions/subscribeAction"
import swal from 'sweetalert'

class Subscriptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subscribed: this.props.userData.subscribeds,
            show: false,
            modal: null
        }
    }

    componentDidMount() {
        this.setState({
            subscribed: this.props.userData.subscribeds
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userData.subscribeds.length != this.props.userData.subscribeds.length) {
            this.setState({
                subscribed: nextProps.userData.subscribeds

            })
        }
    }



    handleClose = () => {
        this.setState({
            show: false
        })
    }

    openProfile = (index) => {
        console.log("usre ets " , this.state.subscribed[index].others)
        this.setState({
            modal: this.state.subscribed[index].others
        }, () => {
            this.setState({
                show: true
            })
        }
        )
    }

    unSubscribe = (index) => {

        swal({
            title: "Are you sure you want to Unsubscribe?",
            
            icon: "warning",
            buttons: ["Cancel", "UnSubscribe"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let subscribedId = this.state.subscribed[index].id;
                let subscriberId = null;
        
        
        
                let lenSub = this.state.subscribed[index].others.subscribers.length
                for (let i = 0; i < lenSub; i++) {
                    if (this.state.subscribed[index].others.subscribers[i]["others_id"] == this.props.userData.id) {
                        subscriberId = this.state.subscribed[index].others.subscribers[i].id
                        
                        break;
                    }
                }
        
                const data = {
                    subscribedId,
                    subscriberId
                }
        
                //Call Unsubscribe
                this.props.unSubscribe(data).then(res => {
                    let arr = this.state.subscribed
                    arr.splice(index,1)
                    this.setState({
                        subscribed:arr
                    })
                    swal("Unsubscribed", {
                        icon: "success",
                      });
        
                })
             
            }
          });



       
    }


    render() {
        return (
            <div>


                <Modal show={this.state.show} onHide={() => this.setState({show:false})}
                    size="lg"
                    dialogClassName="modal-90w"

                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Body>
                        <UserProfile user={this.state.modal && this.state.modal} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({show:false})}>
                            Close
                        </Button>

                    </Modal.Footer>

                </Modal>
                {this.state.subscribed.length == 0 && 
                <div className="noSubs">
                <p>Subscribe to Channels to see them here</p>
                </div>
                }
                {this.state.subscribed.length != 0 && this.state.subscribed.map((elem, index) => (

                    <div className="userBar">
                        <div className="userAll" onClick={() => this.openProfile(index)}>

                            <img className="userAvatarSub" src={elem.others.avatar ? elem.others.avatar : "https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg"}></img>
                            <div className="userDetailSub">
                                <span><b>{elem.others.userName}</b></span>
                                <span>{elem.others.name}</span>
                            </div>
                            <div className="userSubscribers">
                                <span><b>Subscribers</b></span>
                                <span>{elem.others.subscribers.length}</span>
                            </div>
                            <div className="userUpload">
                                <span><b>Uploads</b></span>
                                <span>{elem.others.videos.length}</span>
                            </div>

                        </div>

                        <div className="unsubscribeUser" onClick={() => this.unSubscribe(index)}>
                            <p>+</p>
                        </div>
                    </div>


                ))}



            </div >
        )
    }

}

const mapStateToProps = (state) => {
    console.log("state", state)

    return {
        userData: state.userReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {

        unSubscribe: (data) => dispatch(subscribeAction.unSubscribe(data)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);