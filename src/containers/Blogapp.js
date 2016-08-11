import React from 'react';
import Sidebar from '../components/Sidebar';


export default class Blogapp extends React.Component {
    constructor (props) {
        super(props);
    }
    render(){
        return (
            <div id="layout" className="pure-g">
                <Sidebar />
                {this.props.children}
            </div>
        );
    }
}