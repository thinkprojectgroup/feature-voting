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
            <div className="comment-section-container">
                    {!this.state.deleted ?
                    <div className="comment-section-content">
                        <p>{this.state.count + 1}</p>
                        <p>{this.state.author.name}</p>
                        <p>{this.state.content}</p>
                        <p>{this.state.date}</p>
                    </div> : null}   
            </div>

        );
    }

}

export default Comment