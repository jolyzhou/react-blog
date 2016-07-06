import React from 'react';
import { render } from 'react-dom';
import Blogapp from './containers/Blogapp';

let rootElement = document.getElementById('root');
render(
    <Blogapp />,
    rootElement
);