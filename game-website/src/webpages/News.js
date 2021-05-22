import React from 'react';
import './News.css';

function newsArticle(title, author, publisher, link, date) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.link = link;
    this.date = date;
}

var myItems = [];


//for(int i = 0, i < 5, i++){
//    var div = document.createElement('div');
//    document.body.appendChild(div);
//}



const News = () =>{
    return(
        <div>
            <h1>News</h1>
            
            <p>{myItems[0].title} {myItems[0].author} {myItems[0].publisher}</p>

        </div>
    );  
};

export default News;