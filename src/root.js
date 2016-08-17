import React from 'react';
import { render } from 'react-dom';
import {bindActionCreators, combineReducers} from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import Blogapp from './containers/Blogapp';
import Contents from './components/Contents';
import {About, Login, Contact, Detail} from './components/Sidebutton';
import Postlist from './components/Postlist';
import Posts from './components/Posts';
import {Router, Route, browserHistory, IndexRoute, hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as appactions from './actions/appactions';
import configureStore from './store/configureStore';

export const store = configureStore();

const history = syncHistoryWithStore(hashHistory, store);
/**
 * 定义BLOG要用的所有组件
 * @type {{path: string, component: Blogapp, indexRoute: {component: Contents}, childRoutes: *[]}}
 */
const routes = {
    path: '/',
    component: Blogapp,
    indexRoute: { component: Contents },
    childRoutes: [
        { path: 'main', component: Contents },
        { path: 'about', component: About },
        { path: 'contact', component: Contact },
        { path: 'login', component: Login },
        { path: 'posts', component: Posts },
        { path: 'postlist', component: Postlist },
        { path: 'detail/:id', component: Detail }

    ]
};

class Root extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <Router history={history} routes={routes} />
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

