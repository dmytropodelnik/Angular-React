import React from "react";
import {BrowserRouter} from "react-router-dom";

import Routing from '../../routes/route'
import {LoginContext} from '../../LoginContext/LoginContext'

import "./SocialNetwork.css";

export default class SocialNetwork extends React.Component { 

    constructor(props) {
        super(props);
    
        this.toggleLogging = () => {
          this.setState(state => ({
            isLogged: !state.isLogged,
          }));
        };

        this.setCurrentUserId = (id) => {
            this.setState((state) => ({
                currentUserId: id,
            }));
          };

        this.setDefaultUserId = () => {
            this.setState(state => ({
                currentUserId: -1,
            }))
        }
    
        // Состояние хранит функцию для обновления контекста,
        // которая будет также передана в Provider-компонент.
        this.state = {
            isLogged: false,
            currentUserId: -1,
            toggleLogging: this.toggleLogging,
            setCurrentUserId: this.setCurrentUserId,
            setDefaultUserId: this.setDefaultUserId,
        };
      }
 
    render() {
        return (
            <div>
                <LoginContext.Provider value={this.state}>
                    <BrowserRouter>
                        <Routing/>
                    </BrowserRouter>
                </LoginContext.Provider>
            </div>
        )
    }
};