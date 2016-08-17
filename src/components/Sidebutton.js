import React,{PropTypes} from 'react';
import * as appactions from '../actions/appactions';
import {browserHistory, hashHistory} from 'react-router';
import * as sessionStorage from '../utils/sessionStorage';
import * as constants from '../constants';
import Remarkable from 'remarkable';

export class About extends React.Component {
    render() {
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <div className="posts">
                        <h3>About</h3>
                        <div className="contact">
                            <h4>This is a example showcasing mostly react redux react-router react-redux and it provide the basic usage of these libraries.</h4>
                            <h4>Souce Code: <a href="https://github.com/jolyzhou/react-blog" target="_blank">https://github.com/jolyzhou/react-blog</a></h4>
                        </div>
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
                    sessionStorage.put('isLogin',true);//save login session
                    const login_state = store.getState().reducers.login.lg_status;
                    if(login_state === true){
                        let nextPath = '/posts';
                        hashHistory.push(nextPath);
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
                        <div className="contact">
                            <h4>Have questions? I have answers (maybe).</h4>
                            <h4>My email: zhoujianyurain@gmail.com</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class Detail extends React.Component {
    static contextTypes = {
        store: PropTypes.any
    };
    componentDidMount() {
        const { store } = this.context;
        $.post( constants.HOST+"api/detail", { id: this.props.params.id })
            .done(function( result ) {
                store.dispatch(appactions.posts_detail(result.detail))
            }.bind(this));
    }
    rawMarkup(raw) {
        var md = new Remarkable('full', {
            html:         false,        // Enable HTML tags in source
            xhtmlOut:     false,        // Use '/' to close single tags (<br />)
            breaks:       true,        // Convert '\n' in paragraphs into <br>
            langPrefix:   'language-',  // CSS language prefix for fenced blocks
            linkify:      false,         // autoconvert URL-like texts to links
            linkTarget:   '',           // set target to open link in
            typographer:  false,
            quotes: '“”‘’'
        });
        var rawMarkup = md.render(raw);
        return { __html: rawMarkup };
    }
    render() {
        const { store } = this.context;
        const state_detail = store.getState().reducers.posts.detail;
        let state_title = "";
        let state_content_raw = "";
        if(state_detail[0] === undefined){

        } else {
            state_title = state_detail[0].title;
            state_content_raw = state_detail[0].content_raw;
        }
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <div className="posts">
                        <h3 className="h3detail">{state_title}</h3>
                        <div className="detailcontent" dangerouslySetInnerHTML={::this.rawMarkup(state_content_raw.toString())} />

                    </div>
                </div>
            </div>
        )
    }
}