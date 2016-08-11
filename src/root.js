import React from 'react';
import { render } from 'react-dom';
import {bindActionCreators, combineReducers} from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import Blogapp from './containers/Blogapp';
import Contents from './components/Contents';
import {About, Login, Contact } from './components/Sidebutton';
import Posts from './components/Posts';
import {Router, Route, browserHistory, IndexRoute, hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as appactions from './actions/appactions';
import configureStore from './store/configureStore';

export const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

class Root extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <Router history={history}>
                <Route path="/" component={Blogapp}>
                    <IndexRoute component={Contents} />
                    <Route path="/main" component={Contents} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/login" component={Login} />
                    <Route path="/posts" component={Posts} />
                </Route>
            </Router>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        loginss: state.reducers
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(appactions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

