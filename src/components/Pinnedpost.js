import React from 'react';

export default class Pinnedpost extends React.Component {
    constructor() {
        super();
        this.state = {
            tittle: "",
            subtitle: ""
        };
    }
    componentDidMount(){
        $.get('http://localhost:8080/api/list', function(result) {
            // let res = JSON.parse(result);
            this.setState({
                title: result.title,
                subtitle: result.subtitle
            });
        }.bind(this));
    }
    render() {
        return (
            <div className="posts">
                <h1 className="content-subhead">Pinned Post</h1>
                <section className="post">
                    <header className="post-header">
                        <img className="post-avatar" alt="Tilo Mitra&#x27;s avatar" height="48" width="48" src="img/common/myphoto.png" />
                            <h2 className="post-title">{this.state.title}</h2>
                            <p className="post-meta"> By
                                <a href="#" className="post-author">Jolyzhou</a> under
                                <a className="post-category post-category-design" href="#">JavaScript</a>
                            </p>
                    </header>
                    <div className="post-description">
                        <p>
                        {this.state.subtitle}
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