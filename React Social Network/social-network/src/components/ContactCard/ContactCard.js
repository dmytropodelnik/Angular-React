import React from "react"

//import $ from 'jquery';
import { Redirect } from 'react-router'

import "../ContactCard/ContactCard.css"

import avatar from "../assets/avatar.jpg"
import { LoginContext } from "../../LoginContext/LoginContext";

class ContactCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            countFollowers: 0,
            isReading: true,

            userId: window.location.href.substring(window.location.href.lastIndexOf("/") + 1),

            userInfo: "123",
            isLoaded: false,
            error: null, 
        };

        this.increaseFolowers = this.increaseFolowers.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.switchEditMode = this.switchEditMode.bind(this);
    }

    increaseFolowers () {

         this.setState(state => ({
             countFollowers: ++state.countFollowers,
         }));
    }

    switchEditMode () {  

        this.setState(state => ({

            isReading: !state.isReading,
        }));
    }

    componentDidMount () {

        fetch(`https://localhost:44318/api/users/${this.state.userId}`)
        .then(res => res.json())
        .then(
            data => {
             this.setState({userInfo: data, isLoaded: true})   
            },
            error => {
                this.setState({isLoaded: true, error})
            }
        )
    }

    saveChanges (event) {

        //event.preventDefault();

        

    }

    render() {

        if (this.state.userInfo === undefined) {
            return <h2>Пользователь не найден</h2>;
        }
        else if (window.location.href.indexOf("/profile/") !== -1 && this.context.isLogged === false)
        {
            return <Redirect to="/auth" />
        }
        else {
            return (
                <div id="user">
                    <div id="firstLine">
                        <img id="avatar" src={avatar} className="rounded float-start" alt="avatar" width="150px"></img>
                        {!this.state.isReading
                            ? <div id="uploadFile" >
                                <label className="form-label" htmlFor="customFile"></label>
                                <input type="file" className="form-control-sm" id="customFile" />
                            </div>
                            : null
                        }
                        <div id="follow">
                        {this.state.isReading && this.context.isLogged && window.location.href.indexOf(`/profile/${this.context.currentUserId}`) === -1
                           ? <button id="followers" type="button" className="btn btn-danger" onClick={this.increaseFolowers}>
                                Follow <span id="countFollowers" className="badge bg-secondary">{this.state.countFollowers}</span>
                            </button>
                           : <button id="followers" type="button" className="btn btn-danger" onClick={this.increaseFolowers} disabled>
                                Followers <span id="countFollowers" className="badge bg-secondary">{this.state.countFollowers}</span>
                             </button>
                        }
                        </div>
                    </div>
                    {this.context.isLogged && window.location.href.indexOf(`/profile/${this.context.currentUserId}`) !== -1
                       ? <div className="form-check form-switch" id="switchMode">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.switchEditMode}/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Edit mode</label>
                        </div>
                       : null 
                    }
                    <form className="row g-3 needs-validation" noValidate name="userInfo">
                        <div className="col-md-4">
                            <label className="form-label">First name</label>
                            {this.state.isReading  
                               ? <input type="text" className="form-control" id="firstName" value={this.state.userInfo.firstName} readOnly={this.state.isReading} />
                               : <input type="text" className="form-control" id="firstName" readOnly={this.state.isReading} />
                            }
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Last name</label>
                            {this.state.isReading
                               ? <input type="text" className="form-control" id="lastName" value={this.state.userInfo.lastName} readOnly={this.state.isReading} />
                               : <input type="text" className="form-control" id="lastName" readOnly={this.state.isReading} />
                            }   
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Username</label>
                            <div className="input-group">
                                <span className="input-group-text">@</span>
                                {this.state.isReading
                                   ? <input id="userName" type="text" aria-describedby="inputGroupPrepend" value={this.state.userInfo.username} readOnly />
                                   : <input id="userName" type="text" aria-describedby="inputGroupPrepend" readOnly />
                                }
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label for="inputEmail" className="form-label">Email address</label>
                            {this.state.isReading
                               ? <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" value={this.state.userInfo.email} readOnly={this.state.isReading}/>
                               : <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" readOnly={this.state.isReading}/>
                            }
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">City</label>
                            {this.state.isReading
                               ? <input type="text" className="form-control" id="city" value={this.state.userInfo.city} readOnly={this.state.isReading} />
                               : <input type="text" className="form-control" id="city" readOnly={this.state.isReading} />
                            }
                        </div>
                        <div className="col-md-6" id="userAbout">
                            <label className="form-label">About</label>
                            {this.state.isReading
                               ? <textarea className="form-control" id="textAbout"  value={this.state.userInfo.about} readOnly={this.state.isReading}></textarea>
                               : <textarea className="form-control" id="textAbout" readOnly={this.state.isReading}></textarea>
                            }   
                        </div>
                        {!this.state.isReading 
                            ? <div className="col-12" id="saveButton">
                                <button className="btn btn-primary" onClick={this.saveChanges}>Save</button>
                            </div>
                            : null
                        }
                    </form>
                </div>
            )
        }
    } 
}

ContactCard.contextType = LoginContext;

export default ContactCard;