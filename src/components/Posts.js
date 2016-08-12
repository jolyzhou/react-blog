import React from 'react';
export default class Posts extends React.Component {
    render() {
        return (
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <h3>Posts</h3>
                    <form className="pure-form pure-form-stacked">
                        <fieldset>
                            <legend>Blog Post Panel</legend>
                            <label htmlFor="b_title">Title</label>
                            <input id="b_title" className="pure-input-1" type="text" placeholder="Title" />
                            <label htmlFor="b_subtitle">Subtitle</label>
                            <input id="b_subtitle" className="pure-input-1" type="text" placeholder="Subtitle" />
                            <label htmlFor="b_tags">Tags</label>
                            <select id="b_tags" className="pure-input-1">
                                <option>PHP</option>
                                <option>JavaScript</option>
                                <option>Other</option>
                            </select>
                            <label htmlFor="b_content">Content</label>
                            <textarea id="b_content" className="pure-input-1" placeholder="Textareas work too" rows="15"></textarea>
                            <button type="submit" className="pure-button pure-button-primary">SAVE POST</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
};
