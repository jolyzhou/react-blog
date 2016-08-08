import React from 'react';
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
    render() {
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <div className="posts">
                        <h3>Login</h3>
                        <div className="app-center">
                        <form className="pure-form pure-form-stacked">
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