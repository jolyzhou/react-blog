import React,{PropTypes} from 'react';
import * as appactions from '../actions/appactions';
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
    static propTypes = {

    };
    static contextTypes = {
        store: PropTypes.any,
        history: PropTypes.object.isRequired,
        router:PropTypes.object.isRequired
    };
    constructor (props) {
        super(props);
    }
    handleSubmit (evt) {
        evt.preventDefault();
        const { history, store, router } = this.context;
        console.log(store.getState());
        store.dispatch(appactions.login(true));
        const login_state = store.getState().reducers.login.lg_status;
        if(login_state === true){
            let nextPath = '/posts';
            router.push(nextPath);
        } else {
            console.log("login failed.");
        }

    }
    render() {
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <div className="posts">
                        <h3>Login Panel</h3>
                        <form className="pure-form pure-form-stacked" onSubmit={::this.handleSubmit}>
                            <fieldset>
                                <legend>Please Login</legend>
                                <label >Email</label>
                                <input id="email" type="email" placeholder="Email" />
                                <label >Password</label>
                                <input id="password" type="password" placeholder="Password" />
                                <button type="submit" className="pure-button pure-button-primary">Sign in</button>
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