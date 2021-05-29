import React from 'react';
import Post from '../Components/Post/Post'
import Form from '../Components/Form/Form'
import './Forum.css'
import axios from 'axios';

class Forum extends React.Component{
    constructor(props){
        super(props);
        this.state={
            posts:[],

        }
    }
    componentWillMount(){
        axios.get('/forum/get')
        .then((res) => {
            const postJson = res.data;
            this.setState({
                posts: postJson
            })
        })
    }

    render(){
        return(
            <div className="forumPageContainer">
               <div className="posts">
                    {this.state.posts.map((post, index) => {
                        return(<Post key={index} title={post.title} message = {post.message} tags={post.tags} creator={post.creator} date={post.createdAt} likeCount={post.likeCount} selectedFile={post.selectedFile}/>)
                    })}   
                </div>
                <div id="form">
                    <Form/>
                </div>
            </div>
        )
    }
}

export default Forum;
