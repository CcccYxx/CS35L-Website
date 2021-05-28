import React from 'react';
import Post from '../Components/Post/Post'
import Form from '../Components/Form/Form'
import './Forum.css'
class Forum extends React.Component{



    render(){
        return(
            <div className="forumPageContainer">
               <div className="posts">
                   <Post title="Hello" message = "I am a weeb, so I like anime games and stuff" tags={["action", "anime"]} creator="CCCyx" date="2021/5/28" likeCount={999}/>
                </div>
                <div id="form">
                    <Form/>
                </div>
            </div>
        )
    }
}

export default Forum;