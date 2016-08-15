import React, {PropTypes} from 'react';
import * as appactions from '../actions/appactions';

export default class Currentpost extends React.Component {
    static contextTypes = {
        store: PropTypes.any
    };
    constructor() {
        super();
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
    currentPanel(title, subtitle, key){
        return (
            <section className="post" key={key}>
                <header className="post-header">
                    <img className="post-avatar" alt="Andrew Wooldridge&#x27;s avatar" height="48" width="48" src="img/common/myphoto.png" />
                    <h2 className="post-title">{title}</h2>
                    <p className="post-meta">By
                        <a className="post-author" href="#">jolyzhou</a> under
                        <a className="post-category post-category-yui" href="#">YUI</a>
                    </p>
                </header>
                <div className="post-description">
                    <p>{subtitle}
                    </p>
                </div>
            </section>
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
    render() {
        const { store } = this.context;
        const state_data = store.getState().reducers.posts.data;
        const state_page = store.getState().reducers.posts.page;
        const state_page_num = store.getState().reducers.posts.page_num;
        let contents = [];
        for(let i = 0; i < state_data.length; i++) {
            contents.push(this.currentPanel(state_data[i].title,state_data[i].subtitle,i)) ;
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
            <div className="posts">
                <h1 className="content-subhead">Recent Posts</h1>
                {contents}
                <button  className={p_button_disable} onClick={::this.pageprevHandle}>&laquo; Prev</button>
                <button  className={n_button_disable} onClick={::this.pagenextHandle}>Next &raquo;</button>
            </div>
        );
    }
}