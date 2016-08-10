import React from 'react';

export default class Pinnedpost extends React.Component {
    constructor() {
        super();
        this.state = {
            des: ""
        };
    }
    componentDidMount(){
        $.get('http://localhost:8080/api/list', function(result) {
            // let res = JSON.parse(result);
            this.setState({
                des: result.one
            });
        }.bind(this));
    }
    render() {
        return (
            <div className="posts">
                <h1 className="content-subhead">Pinned Post</h1>
                <section className="post">
                    <header className="post-header">
                        <img className="post-avatar" alt="Tilo Mitra&#x27;s avatar" height="48" width="48" src="img/common/tilo-avatar.png" />
                            <h2 className="post-title">Introducing React</h2>
                            <p className="post-meta"> By
                                <a href="#" className="post-author">Jolyzhou</a> under
                                <a className="post-category post-category-design" href="#">CSS</a>
                                <a className="post-category post-category-pure" href="#">Pure</a>
                            </p>
                    </header>
                    <div className="post-description">
                        <p>
                        {this.state.des}
                        </p>
                    </div>
                </section>
            </div>
        );
    }

    renderDes() {
        return <p>zjy Yesterday at CSSConf, we launched Pure – a new CSS library. Phew! Here are the slides from the presentation. Although it looks pretty minimalist, we’ve been working on Pure for several months. After many iterations, we have released Pure as a set of small, responsive, CSS modules that you can use in every web project.
        </p>
    }
}