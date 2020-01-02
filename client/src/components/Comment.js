import React,{Component} from 'react';


class Comment extends Component{
    constructor(props){
    super(props);
    this.state = {
        author: this.props.author,
        content : this.props.content,
        accepted: this.props.accepted,
        deleted: this.props.deleted,
        date: this.props.date,
        count: this.props.count,
        formattedDate: ''
    };

    if(this.state.author === 'undefined'){
        this.setState({
            author: "Anonymous"
        })
    };
    //console.log(this.state.date);
    //console.log(this.state);
}

    componentDidMount = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(this.state.date).toLocaleDateString('de-DE', options);
    this.setState({
       formattedDate: date
    });
     // console.log(this.state);
    }

    render(){
        return(
            <div className="comment-container col-12 row">
                    {!this.state.deleted ?
                    <div>
                        <p className="comment-author">{this.state.author}</p>
                        <p className="comment-content">{this.state.content}</p>
                        <p  className="comment-date">
                            {this.state.formattedDate}
                        </p>
                    </div> : null}
            </div>

        );
    }

}

export default Comment