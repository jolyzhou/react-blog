import React from 'react';

export default class Currentpost extends React.Component {
    constructor() {
        super();
        this.state = {
            data: "",
            offset: 0,
            limit: 2,
            page: 1,
            page_num: 1
        };
    }

    componentDidMount(){
        $.post( "api/alllist", { offset: this.state.offset, limit: this.state.limit })
            .done(function( result ) {
                this.setState({
                    data: result.data
                });
            }.bind(this));
        $.get('api/allcount', function(result) {
            let page_num = Math.ceil((result.num)/(this.state.limit));
            this.setState({
                page: page_num
            });
        }.bind(this));
    }
    currentPanel(title, subtitle, key){
        return (
            <section className="post" key={key}>
                <header className="post-header">
                    <img className="post-avatar" alt="Andrew Wooldridge&#x27;s avatar" height="48" width="48" src="img/common/myphoto.png" />
                    <h2 className="post-title">{title}</h2>
                    <p className="post-meta">By
                        <a className="post-author" href="#">Andrew Wooldridge</a> under
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
        if(this.state.page_num <= this.state.page && this.state.page_num > 1){
            this.setState({
                page_num: this.state.page_num-1,
                offset: this.state.offset - this.state.limit
            });
            $.post( "api/alllist", { offset: this.state.offset - this.state.limit, limit: this.state.limit })
                .done(function( result ) {
                    this.setState({
                        data: result.data
                    });
                }.bind(this));
        }


    }
    pagenextHandle(){
        if(this.state.page_num < this.state.page){
            this.setState({
                page_num: this.state.page_num+1,
                offset: this.state.offset + this.state.limit
            });
            $.post( "api/alllist", { offset: this.state.offset + this.state.limit, limit: this.state.limit })
                .done(function( result ) {
                    this.setState({
                        data: result.data
                    });
                }.bind(this));
        }

    }
    render() {
        let contents = [];
        for(let i = 0; i < this.state.data.length; i++) {
            contents.push(this.currentPanel(this.state.data[i].title,this.state.data[i].subtitle,i)) ;
        }
        let p_button_disable = null, n_button_disable = null ;
        if(this.state.page_num === 1){
            p_button_disable = 'pure-button pure-input-1 pure-button-primary pure-button-disabled';
        } else {
            p_button_disable = 'pure-button pure-input-1 pure-button-primary';
        }
        if(this.state.page_num === this.state.page){
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