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

    onClickLike = (event) => {
        const index =  event.currentTarget.value;
        for(var i in this.state.posts){
            if(i === index){
                const targetPost = this.state.posts[i];
                const body = {
                    _id: targetPost._id,
                    likeCount: targetPost.likeCount
                }
                axios.patch('/forum/patch/likeCount', body)
                .then(res => {
                    if(res.status === 200){
                        let posts = [...this.state.posts];
                        let post = {...posts[index]};
                        post.likeCount = post.likeCount + 1;
                        posts[index] = post;
                        this.setState({posts})
                    }
                })
                break;
            }
        }
    }

    componentDidMount(){
        axios.get('/forum/get')
        .then((res) => {
            const postJson = res.data;
            if(res.status === 200){
                this.setState({
                    posts: postJson
                })
            }
        })
    }

    render(){
        return(
            <div className="forumPageContainer">
               <div className="posts">
                    {this.state.posts.map((post, index) => {
                        return(<Post key={index} title={post.title} message = {post.message} tags={post.tags} creator={post.creator} date={post.createdAt} likeCount={post.likeCount} selectedFile={post.selectedFile} onClickLike={this.onClickLike} i={index}/>)
                    })}   
                </div>
                <div id="formContainer">
                    <Form className="postForm"/>
                </div>
            </div>
        )
    }
}

export default Forum;
