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
            postsCount: 0,
        }
    }

    onClickDel = (event) => {
        const index = event.currentTarget.value;
        const targetPost = this.state.posts[index];
        axios.delete('/del/'+targetPost._id)
        .then(res => {
            if(res.status === 200){
                var newPosts = [...this.state.posts];
                newPosts.splice(index, 1);
                this.setState({
                    posts: newPosts,
                    postsCount: newPosts.length
                });
            }else{
                alert("Failed to delete this post.");
            }
        })

    }

    onClickLike = (event) => {
        const index = event.currentTarget.value;
        const targetPost = this.state.posts[index];
        const body = {
            _id: targetPost._id,
            likeCount: targetPost.likeCount
        }
        axios.patch('/forum/patch/likeCount', body)
            .then(res => {
                if (res.status === 200) {
                    let newPosts = [...this.state.posts];
                    let targetPost = { ...newPosts[index] };
                    targetPost.likeCount = targetPost.likeCount + 1;
                    newPosts[index] = targetPost;
                    this.setState({ posts: newPosts })
                }else{
                    alert("Failed to like this post.")
                }
            })

    }

    componentDidMount(){
        axios.get('/forum/get')
        .then ((res) => {
            if(res.status === 200){
                const postJson = res.data;
                this.setState({
                    posts: postJson.reverse(),
                    postsCount: postJson.length
                })
            }else{
                alert("Failed to load posts")
            }
        })
    }

    render(){
        const postsCount = this.state.postsCount;
        return(
            <div className="forumPageContainer">
               <div className="posts">
                    {this.state.posts.slice(0, postsCount % 2 === 0 ? postsCount/2 : postsCount/2 + 1).map((post, index) => {
                        return(<Post key={post._id} title={post.title} message = {post.message} tags={post.tags} creator={post.creator} 
                            date={post.createdAt} likeCount={post.likeCount} selectedFile={post.selectedFile} 
                            onClickLike={this.onClickLike} onClickDel={this.onClickDel} 
                            i={index}/>)
                    })}   
                </div>
                <div className="posts">
                    {this.state.posts.slice(postsCount % 2 === 0 ? postsCount/2 : postsCount/2 + 1, postsCount).map((post, index) => {
                        return(<Post key={post._id} title={post.title} message = {post.message} tags={post.tags} creator={post.creator} 
                            date={post.createdAt} likeCount={post.likeCount} selectedFile={post.selectedFile} 
                            onClickLike={this.onClickLike} onClickDel={this.onClickDel} 
                            i={index +  (postsCount % 2 === 0 ? Math.floor(postsCount/2) : Math.floor(postsCount/2 + 1))}/>)
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
