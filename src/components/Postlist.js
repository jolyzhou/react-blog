import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import * as appactions from '../actions/appactions';
import * as sessionStorage from '../utils/sessionStorage';
import {browserHistory,hashHistory} from 'react-router';
export default class Postslist extends React.Component {
    static contextTypes = {
        store: PropTypes.any
    };
    editHandle(e){
        let nextPath = '/posts';
        hashHistory.push(nextPath);
        sessionStorage.put('update_id', e.target.value);

    }
    currentPanel(title, subtitle, tag, id, key){
        return (
            <tr key={key}>
                <td>{key+1}</td>
                <td>{title}</td>
                <td>{subtitle}</td>
                <td>{tag}</td>
                <td><button className="pure-button button-success" value={id} onClick={this.editHandle}>edit</button></td>
            </tr>
        )
    }
    pageprevHandle(){
        const { store } = this.context;
        const state_offset = store.getState().reducers.posts.offset;
        const state_limit = store.getState().reducers.posts.limit;
        const state_page = store.getState().reducers.posts.page;
        const state_page_num = store.getState().reducers.posts.page_num;
        if(state_page_num <= state_page && state_page_num > 1){
            store.dispatch(appactions.page_prev((state_page_num - 1),(state_offset - state_limit)));
            $.post( "api/alllist", { offset: state_offset - state_limit, limit: state_limit })
                .done(function( result ) {
                    store.dispatch(appactions.posts_alllist(result.data));
                }.bind(this));
        }


    }
    pagenextHandle(){
        const { store } = this.context;
        const state_offset = store.getState().reducers.posts.offset;
        const state_limit = store.getState().reducers.posts.limit;
        const state_page = store.getState().reducers.posts.page;
        const state_page_num = store.getState().reducers.posts.page_num;
        if(state_page_num < state_page){
            store.dispatch(appactions.page_next((state_page_num + 1),(state_offset + state_limit)));
            $.post( "api/alllist", { offset: state_offset + state_limit, limit: state_limit })
                .done(function( result ) {
                    store.dispatch(appactions.posts_alllist(result.data));
                }.bind(this));
        }

    }
    componentDidMount(){
        const { store } = this.context;
        const state_offset = store.getState().reducers.posts.offset;
        const state_limit = store.getState().reducers.posts.limit;
        $.post( "api/alllist", { offset: state_offset, limit: state_limit })
            .done(function( result ) {
                store.dispatch(appactions.posts_alllist(result.data));
            }.bind(this));
        $.get('api/allcount', function(result) {
            let page_num = Math.ceil((result.num)/(state_limit));
            store.dispatch(appactions.posts_allcount(page_num));
        }.bind(this));
    }
    render() {
        const { store } = this.context;
        const state_data = store.getState().reducers.posts.data;
        const state_page = store.getState().reducers.posts.page;
        const state_page_num = store.getState().reducers.posts.page_num;
        let contents = [];
        for(let i = 0; i < state_data.length; i++) {
            contents.push(this.currentPanel(state_data[i].title,state_data[i].subtitle,state_data[i].tag,state_data[i].id,i)) ;
        }
        let p_button_disable = null, n_button_disable = null ;
        if(state_page_num === 1){
            p_button_disable = 'pure-button pure-input-1 pure-button-primary pure-button-disabled';
        } else {
            p_button_disable = 'pure-button pure-input-1 pure-button-primary';
        }
        if(state_page_num === state_page){
            n_button_disable = 'pure-button pure-input-1 pure-button-primary pure-button-disabled';
        } else {
            n_button_disable = 'pure-button pure-input-1 pure-button-primary';
        }
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <h3>post list</h3>
                    <table className="pure-table pure-table-horizontal">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>Tag</th>
                            <th>Edit</th>
                        </tr>
                        </thead>

                        <tbody>
                        {contents}
                        </tbody>
                    </table>
                    <button  className={p_button_disable} onClick={::this.pageprevHandle}>&laquo; Prev</button>
                    <button className="pure-button"> {state_page_num} / {state_page}</button>
                    <button  className={n_button_disable} onClick={::this.pagenextHandle}>Next &raquo;</button>
                </div>
            </div>
        )
    }
};
