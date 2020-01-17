import React,{Component} from 'react';
import { Carousel } from 'react-responsive-carousel';

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
        formattedDate: '',
        imageUrls: this.props.imageUrls
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

    if(!this.state.author){
        this.setState({
            author: "Anonymous"
        })
    };
    // console.log(this.state);
    }

    render(){
        var images
        if(!this.state.imageUrls){
            images = require("../img/computer.png");
        }
        else{
            images = this.state.imageUrls
        }
        return(
            <div className="comment-container col-12 row">
                    <div>
                        <p className="comment-author">{this.state.author}</p>
                        <p className="comment-content">{this.state.content}</p>
                        <p  className="comment-date">
                            {this.state.formattedDate}
                        </p>
                        <div className="comment-images">
                            <Carousel showThumbs={false}>
                                {images.map(imageUrl => (
                                    <div>
                                        <img src={imageUrl}/>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
            </div>

        );
    }

}

export default Comment