import React from 'react';
import { render } from 'react-dom';
import Blogapp from '../containers/Blogapp';
import Contents from '../components/Contents';
import About from '../components/About';
import Contact from '../components/Contact';

import {Router, Route, browserHistory, IndexRoute, hashHistory} from 'react-router';

let rootElement = document.getElementById('root');
render((
    <Router history={hashHistory}>
        <Route path="/" component={Blogapp}>
            <IndexRoute component={Contents} />
            <Route path="/main" component={Contents} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
        </Route>
    </Router>
), rootElement);