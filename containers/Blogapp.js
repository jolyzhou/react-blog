import React from 'react';
import Sidebar from '../components/Sidebar';
import Contents from '../components/Contents';

export default class Blogapp extends React.Component {
    render(){
        return (
            <div id="layout" className="pure-g">
                <Sidebar />
                <Contents />
            </div>
        );
    }
}