import React,{Component} from 'react';


class Comment extends Component{
    state = {
        author: this.props.author,
        content : this.props.content,
        accepted: this.props.accepted,
        deleted: this.props.deleted,
        date: this.props.date,
        count: this.props.count
    };


    render(){
        return(
            <div className="comment-container col-12 row">
                    {!this.state.deleted ?
                    <div>
                        <p className="comment-author">{this.state.author}</p>
                        <p className="comment-content">{this.state.content}</p>
                        <p  className="comment-date">{this.state.date}</p>
                    </div> : null}
            </div>

        );
    }

}

export default Comment