import React from 'react';
import { render } from 'react-dom';
import Blogapp from './containers/Blogapp';
import Contents from './components/Contents';
import {About, Login, Contact } from './components/Sidebutton';
import Posts from './components/Posts';
import {Router, Route, browserHistory, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import Root,{store} from './root';

let rootElement = document.getElementById('root');
render((
    <Provider store={store}>
        <Root />
    </Provider>
), rootElement);