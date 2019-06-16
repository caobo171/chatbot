import React from 'react'
import { Provider, SubscribeOne } from "unstated-x";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import botContainer from './containers/botContainer'
import AppMain from './AppMain';
import Login from './Login'

export default class App extends React.Component {
    constructor(props) {

        super(props);
        this.path = window.location.href.indexOf('/dev') !== -1 || window.location.hostname === 'localhost' ? '/dev' : ''

    }
    componentDidMount = () => {
        const user = localStorage.getItem('angelhack')
        if (!user && window.location.pathname !== this.path + '/login') {
            window.location.pathname = this.path + '/login'
        } else if (user && window.location.pathname !== this.path + '/') {
            window.location.pathname = this.path + '/'
        }

    }
    render() {
        return (
            <Provider>
                <Router>
                    <Route path={this.path + `/`} exact component={AppMain} />
                    <Route path={this.path + `/login`} exact component={Login} />
                </Router >
                <ToastContainer />

            </Provider >
        )
    }


}


export const rootPath = window.location.href.indexOf('/dev') !== -1 || window.location.hostname ==='localhost'? '/dev' : ''