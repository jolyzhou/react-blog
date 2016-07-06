import React from 'react';

export default class    Sidebar extends React.Component {
    render(){
        return (
            <div className="sidebar pure-u-1 pure-u-md-1-4">
                <div className="header">
                    <h1 className="brand-title">A Sample Blog</h1>
                    <h2 className="brand-tagline">Creating a blog layout using Pure</h2>

                    <nav className="nav">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <a className="pure-button" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="pure-button" href="#">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}