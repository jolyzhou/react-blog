import React, {PropTypes} from 'react';
import * as appactions from '../actions/appactions';

export default class Pinnedpost extends React.Component {
    static contextTypes = {
        store: PropTypes.any
    };
    constructor() {
        super();
    }
    componentDidMount(){
        const { store } = this.context;
        $.get('api/list', function(result) {
            store.dispatch(appactions.posts_pinned(result.pin));
        }.bind(this));
    }
    render() {
        const { store } = this.context;
        const state_pin = store.getState().reducers.posts.pin;
        let state_title = "";
        let state_tag = "";
        let state_subtitle = "";
        if(state_pin[0] === undefined){

        } else {
            state_title = state_pin[0].title;
            state_tag = state_pin[0].tag;
            state_subtitle = state_pin[0].subtitle;
        }

        return (
            <div className="posts">
                <h1 className="content-subhead">Pinned Post</h1>
                <section className="post">
                    <header className="post-header">
                        <img className="post-avatar" alt="Tilo Mitra&#x27;s avatar" height="48" width="48" src="img/common/myphoto.png" />
                            <h2 className="post-title">{state_title}</h2>
                            <p className="post-meta"> By
                                <a href="#" className="post-author">Jolyzhou</a> under
                                <a className="post-category post-category-design" href="#">{state_tag}</a>
                            </p>
                    </header>
                    <div className="post-description">
                        <p>
                        {state_subtitle}
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}