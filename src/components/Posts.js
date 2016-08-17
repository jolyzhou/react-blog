import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {browserHistory,hashHistory} from 'react-router';
import * as sessionStorage from '../utils/sessionStorage';
import * as constants from '../constants';
import * as appactions from '../actions/appactions';
export default class Posts extends React.Component {
    static contextTypes = {
        store: PropTypes.any
    };
    constructor (props) {
        super(props);
        this.state = {
            b_id:"",
            b_title:"",
            b_subtitle:"",
            b_tags:"",
            b_pinned:"",
            b_content:""
        };
    }
    handleInputChange (evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleSubmit (evt) {
        evt.preventDefault();
        const { store } = this.context;
        $.post( "api/save", { ...this.state })
            .done(function( result ) {
                let nextPath = '/postlist';
                hashHistory.push(nextPath);
                alert("succeed.");
                const state_offset = store.getState().reducers.posts.offset;
                const state_limit = store.getState().reducers.posts.limit;
                $.post( "api/alllist", { offset: state_offset, limit: state_limit })
                    .done(function( result ) {
                        store.dispatch(appactions.posts_alllist(result.data));
                    }.bind(this));

            }.bind(this));
    }
    componentDidMount(){
        if(sessionStorage.get('update_id') !== null){
            $.post( constants.HOST+"api/detail", { id: sessionStorage.get('update_id') })
                .done(function( result ) {
                    this.setState({
                        b_id: result.detail[0].id,
                        b_title: result.detail[0].title,
                        b_subtitle: result.detail[0].subtitle,
                        b_tags: result.detail[0].tag,
                        b_pinned: result.detail[0].is_pinned,
                        b_content: result.detail[0].content_raw
                    });
                    sessionStorage.remove('update_id');
                }.bind(this));
        }

    }
    render() {
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <h3><Link className="pure-button" to="/postlist">post list</Link></h3>
                    <form className="pure-form pure-form-stacked" onSubmit={::this.handleSubmit} onChange={::this.handleInputChange}>
                        <fieldset>
                            <legend>Blog Post Panel</legend>
                            <label htmlFor="b_title">Title</label>
                            <input id="b_title" className="pure-input-1" name="b_title" type="text" value={this.state.b_title} placeholder="Title" />
                            <label htmlFor="b_subtitle">Subtitle</label>
                            <input id="b_subtitle" className="pure-input-1" name="b_subtitle" type="text" value={this.state.b_subtitle} placeholder="Subtitle" />
                            <label htmlFor="b_tags">Tags</label>
                            <select id="b_tags" className="pure-input-1" value={this.state.b_tags}  name="b_tags">
                                <option></option>
                                <option>PHP</option>
                                <option>JavaScript</option>
                                <option>Other</option>
                            </select>
                            <label htmlFor="b_pinned">Pinned</label>
                            <select id="b_pinned" className="pure-input-1" value={this.state.b_pinned} name="b_pinned">
                                <option></option>
                                <option>YES</option>
                                <option>NO</option>
                            </select>
                            <label htmlFor="b_content">Content</label>
                            <textarea id="b_content" className="pure-input-1" name="b_content" value={this.state.b_content} placeholder="Please write by markdown here" rows="15"></textarea>
                            <input hidden="hidden" value={this.state.b_id} />
                            <button type="submit" className="pure-button pure-button-primary">SAVE POST</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
};
