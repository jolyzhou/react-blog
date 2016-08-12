import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import * as appactions from '../actions/appactions';

export default class Sidebar extends React.Component {
    static contextTypes = {
        store: PropTypes.any,
        router: PropTypes.object.isRequired
    };
    constructor (props) {
        super(props);
    }
    logout(){
        const {store} = this.context;
        store.dispatch(appactions.logout(null));
    }
    postPanel(){
        return (
            <li className="nav-item">
                <Link className="pure-button" to="/posts">Posts</Link>
            </li>
        );
    }
    render(){
        let loginState = this.props.loginState;
        let logPanel,postPanel;
        if(loginState === null){
            logPanel = <Link className="pure-button" to="/login">Login</Link>;
        } else {
            logPanel = <Link className="pure-button" to="/" onClick={this.logout}>Logout</Link>;
            postPanel = this.postPanel();
        }
        return (
            <div className="sidebar pure-u-1 pure-u-md-1-4">
                <div className="header">
                    <h1 className="brand-title">A Sample Blog</h1>
                    <h2 className="brand-tagline">Creating a blog using Reactjs Redux react-route Pure</h2>

                    <nav className="nav">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link className="pure-button" to="/main">Main</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="pure-button" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="pure-button" to="/contact">Contact</Link>
                            </li>
                            {postPanel}
                            <li className="nav-item">
                                {logPanel}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}