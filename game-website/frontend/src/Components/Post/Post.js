import React from 'react';
import './Post.css'
import moment from 'moment'

const Post = ({title, message, creator, tags, selectedFile, likeCount, date, onClickLike, onClickDel, i}) => {
    
    const tagList = tags.map((tag) => 
        <li key={tag} className="tag">
            {tag}
        </li>
    );
    return(
        <div className="postContainer" >
            <div className="postHeader">
                <img id={selectedFile==="" ? "image-hide":"image"} src={selectedFile} alt=""/>
                <p className="creator">{creator}</p>
                <p className="date">{moment(date).format('DD MMM, YYYY hh:mm')}</p>
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
                    <button value={i} className="likeButton" onClick={onClickLike}>
                        LIKE
                    </button>
                    <p className="likeCount">{likeCount}</p>
                </div>
                <div className="delContainer">
                    <button value={i} className="delButton" onClick={onClickDel}>
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;