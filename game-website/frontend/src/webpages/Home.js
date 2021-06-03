import axios from 'axios';
import React from 'react';
import './Home.css';
import Post from '../Components/Post/Post'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchString: "",
            posts: [],
            users: [],
            displaySearchResult: false
        };
    }

    handleChange(event){
        this.setState({
            searchString: event.target.value
        })   
    }

    handleSearchStringChange(event){
        if(event.charCode === 13 && event.target.value){
            axios.get('/search/user/' + this.state.searchString)
            .then((res) => {
                if(res.status === 200 || res.status === 204){
                    this.setState({
                        users: res.data? res.data.reverse() : [],
                        displaySearchResult: true
                    })
                }else if(res.status === 404){
                    alert('Error when searching')
                }
            })
            axios.get('/search/post/' + this.state.searchString)
            .then((res) => {
                if(res.status === 200 || res.status === 204){
                    this.setState({
                        posts: res.data? res.data.reverse() : [],
                        displaySearchResult: true
                    })
                    console.log(this.state.users)
                    console.log(this.state.posts)
                }else if(res.status === 404){
                    alert('Error when searching')
                }
            })
        }else if(event.charCode === 13){
            this.setState({
                posts: [],
                users: [],
                displaySearchResult: false
            })
        }
    }

    render(){
        var postsCount = this.state.posts.length
        return(
            <div className={this.state.displaySearchResult ? 'welcomeSearch' : 'welcome'}>
                <div className={this.state.displaySearchResult ? 'hide' : 'welcome-msg'}> Welcome to Game-Website </div>
                <div className="searchbar_container">
                    <input type="text" className="searchbar" placeholder="Search for posts or people..." maxLength="40"
                    onChange={this.handleChange.bind(this)} onKeyPress={this.handleSearchStringChange.bind(this)}/>
                </div>
                <div className="searchResultContainer">
                <div className="posts">
                    {this.state.posts.slice(0, postsCount % 2 === 0 ? postsCount/2 : postsCount/2 + 1).map((post, index) => {
                        return(<Post key={post._id} title={post.title} message = {post.message} tags={post.tags} creator={post.creator} 
                            date={post.createdAt} likeCount={post.likeCount} selectedFile={post.selectedFile} 
                            onClickLike={null} onClickDel={null} 
                            i={index}/>)
                    })}   
                </div>
                <div className="posts">
                    {this.state.posts.slice(postsCount % 2 === 0 ? postsCount/2 : postsCount/2 + 1, postsCount).map((post, index) => {
                        return(<Post key={post._id} title={post.title} message = {post.message} tags={post.tags} creator={post.creator} 
                            date={post.createdAt} likeCount={post.likeCount} selectedFile={post.selectedFile} 
                            onClickLike={null} onClickDel={null} 
                            i={index +  (postsCount % 2 === 0 ? Math.floor(postsCount/2) : Math.floor(postsCount/2 + 1))}/>)
                    })}   
                </div>
                </div>
            </div>
        );  
    }
};

export default Home;