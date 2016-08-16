import React,{PropTypes} from 'react';
import * as appactions from '../actions/appactions';
import {browserHistory} from 'react-router';
export class About extends React.Component {
    render() {
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <div className="posts">
                        <h3>About</h3>
                    </div>
                </div>
            </div>
        )
    }
};

export class Login extends React.Component {
    /**
     * 通过定义contextTypes，子树中的任何组件可以访问context
     * 如果contextTypes没有定义，那么this.context将是一个空对象。
     * @type {{store: __React.Requireable<any>, changeLoginState: __React.Requireable<any>}}
     */
    static contextTypes = {
        store: PropTypes.any
    };
    constructor (props) {
        super(props);
    }
    handleInputChange (evt) {
        const { store } = this.context;
        if(evt.target.name === 'email')
            store.dispatch(appactions.loginput_email(evt.target.value));
        if(evt.target.name === 'password')
            store.dispatch(appactions.loginput_password(evt.target.value));
    }

    handleSubmit (evt) {
        evt.preventDefault();
        const { store } = this.context;
        const state_email = store.getState().reducers.login.email;
        const state_password = store.getState().reducers.login.password;
        $.post( "api/login", { email: state_email, password: state_password })
            .done(function( result ) {
                if(result.isexist === 1){
                    store.dispatch(appactions.login(true));//发送登录action
                    const login_state = store.getState().reducers.login.lg_status;
                    if(login_state === true){
                        let nextPath = '/posts';
                        browserHistory.push(nextPath);
                    } else {
                        alert("check your email or password.");
                    }
                }else {
                    alert("check your email or password.");
                }

            }.bind(this));
    }
    render() {
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <div className="posts">
                        <h3>Login Panel</h3>
                        <form className="pure-form pure-form-stacked" onSubmit={::this.handleSubmit} onChange={::this.handleInputChange}>
                            <fieldset>
                                <legend>Please Login</legend>
                                <label htmlFor="email">Email</label>
                                <input id="email" className="pure-input-1" name="email" type="email" placeholder="Email" />
                                <label htmlFor="password">Password</label>
                                <input id="password" className="pure-input-1" name="password" type="password" placeholder="Password" />
                                <button type="submit" className="pure-button pure-input-1 pure-button-primary">Sign in</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export class Contact extends React.Component {
    render() {
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <div className="posts">
                        <h3>Contact</h3>
                    </div>
                </div>
            </div>
        )
    }
}