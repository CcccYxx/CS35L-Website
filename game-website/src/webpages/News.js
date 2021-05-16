import React from 'react';
import './News.css';

function newsArticle(title, author, publisher, link) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.link = link;
}
var myItems = [
    new newsArticle('Genshin Impact', 'John Genshinimpact', 'IGN'),
];

var div = document.createElement('div');
document.body.appendChild(div);


const News = () =>{
    return(
        <div>
            <h1>News</h1>
            
            <p>{myItems[0].title} {myItems[0].author} {myItems[0].publisher}</p>

        </div>
    );  
};

export default News;