import React from 'react';
import './Post.css'

const Post = ({title, message, creator, tags, selectedFile, likeCount, date, onClickLike, onClickDel}) => {
    
    const tagList = tags.map((tag) => 
        <li>
            {tag}
        </li>
    );
    return(
        <div className="postContainer" style={{backgroundImage:{selectedFile}}}>
            <div className="postHeader">
                <p className="creator">{creator}</p>
                <p className="date">{date}</p>
            </div>
            <div className="postBody">
                <ul className="tags">
                    {tagList}
                </ul>
                <h2 className="title">{title}</h2> 
                <p className="message">{message}</p>
            </div>
            <div className="postFooter">
                <div className="likeContainer">
                    <button className="likeButton" onClick={onClickLike}>
                        LIKE
                    </button>
                    <p className="likeCount">{likeCount}</p>
                </div>
                <div className="delContainer">
                    <button className="delButton" onClick={onClickDel}>
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;