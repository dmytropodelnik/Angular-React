import React from "react"
import {Link} from 'react-router-dom'
import { LoginContext } from "../../LoginContext/LoginContext"
import { Redirect } from "react-router";

class FriendList extends React.Component{

    constructor(props)   {

        super(props);

        this.state = {
            friends: [],
            isLoaded: false,
            error: null,   
        };
    }

    componentDidMount(){
        fetch("https://localhost:44318/api/profile/friends")
        .then(res => res.json())
        .then(
            data => {
             this.setState({users: data, isLoaded: true})   
            },
            error => {
                this.setState({isLoaded: true, error})
            }
        )
    }

    render() { 

        const { friends, isLoaded, error } = this.state;

        //let {id} = this.state.users;

        let userComponents = null;

        if (!this.context.isLogged)
        {
            return <Redirect to="/auth" />
        }
        if (error) {
            userComponents = <p>Error: {error.message}</p>
        }
        else if (!isLoaded) {
            userComponents = <p>Loading...</p>
        }
        else if (users.length) {
            userComponents = friends.map(function(item) {
                return  <li key={item.id}>
                            <div className="card mb-3" id="card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="..." className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <Link to={{ pathname: `/users/${item.id}`,
                                                state: { data: item }
                                                }}>
                                                <h5 className="card-title">{item.username}</h5>
                                            </Link>
                                            <p className="card-text">{
                                                item.about !== null
                                                ? item.about.substring(0, item.about.indexOf(".", 30) + 1)
                                                : null
                                            }</p>
                                            <div className="blockquote-footer">
                                                {/* <p className="card-text"><small className="text-muted">{item.city}</small></p> */}
                                                From <cite title="Username">{item.city}</cite>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    });
        } else {
            userComponents = <p>No users</p>
        }

        return (
            <div id="main">
                <ul className="navbar-nav">
                    {userComponents}
                </ul>
            </div>
        )
    }
}

FriendList.contextType = LoginContext;

export default FriendList;