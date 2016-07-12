import React from 'react';
import { render } from 'react-dom';
import Blogapp from '../containers/Blogapp';
import {Router, Route, browserHistory} from 'react-router';

let rootElement = document.getElementById('root');
render((
    <Router history={browserHistory}>
        <Route path="/" component={Blogapp}>

        </Route>
    </Router>
), rootElement);