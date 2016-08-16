import React,{PropTypes} from 'react';
import Sidebar from '../components/Sidebar';


export default class Blogapp extends React.Component {
    static contextTypes = {
        store: PropTypes.any
    };
    constructor (props) {
        super(props);
    }

    render(){
        const {store} = this.context;
        const login_state = store.getState().reducers.login.lg_status;
        return (
            <div id="layout" className="pure-g">
                <Sidebar loginState={login_state}/>
                {this.props.children}
            </div>
        );
    }
}