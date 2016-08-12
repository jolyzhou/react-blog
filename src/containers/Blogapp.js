import React,{PropTypes} from 'react';
import Sidebar from '../components/Sidebar';


export default class Blogapp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {loginState:null};
    }
    /**
     * 通过添加childContextTypes和getChildContext
     * React会自动下传信息
     * @type {{changeLoginState: __React.Requireable<any>}}
     */
    static childContextTypes = {
        changeLoginState: PropTypes.any
    };
    getChildContext(){
        return {
            changeLoginState: this.changeLoginState.bind(this)
        }
    }
    changeLoginState(l_state){//修改state重新加载组件
        this.setState({
            loginState: l_state
        });
    }
    render(){
        return (
            <div id="layout" className="pure-g">
                <Sidebar loginState={this.state.loginState}/>
                {this.props.children}
            </div>
        );
    }
}