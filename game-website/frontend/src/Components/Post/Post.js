import React from 'react';
import './Post.css'
import moment from 'moment'

const Post = ({title, message, creator, tags, selectedFile, likeCount, date, onClickLike, onClickDel, i}) => {
    
    const tagList = tags.map((tag) => 
        <li key={tag} className="tag">
            <i>{tag}</i>
        </li>
    );
    return(
        <div className="postContainer" >
            <div className="postHeader">
                <img id={selectedFile==="" ? "image-hide":"image"} src={selectedFile} alt=""/>
                <p className="creator"><b>Author:</b> {creator}</p>
                <p className="date"><b>Created at:</b> {moment(date).format('DD MMM, YYYY hh:mm')}</p>
            </div>
            <div className="postBody">
                <ul className="tags">
                    {tagList}
                </ul>
                <h2 className="title">{title}</h2> 
                <pre className="message">{message}</pre>
            </div>
            <div className="postFooter">
                <div className="likeContainer">
                    <button value={i} className={onClickLike === null ? "likeButtonNotAllow" : "likeButton"} onClick={onClickLike}>
                    </button>
                    <p className="likeCount">{likeCount}</p>
                </div>
                <div className="delContainer">
                    <button value={i} className={onClickDel === null ? "delButtonNotAllow":"delButton"} onClick={onClickDel}>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;