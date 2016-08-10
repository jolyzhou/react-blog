import React from 'react';
import Pinnedpost from '../components/Pinnedpost';
import Currentpost from '../components/Currentpost';
import Footer from '../components/Footer';

export default class Contents extends React.Component {
    render(){
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <Pinnedpost />
                    <Currentpost />
                    <Footer />
                </div>
            </div>
        );
    }
}