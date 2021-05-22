import React from 'react';
import './News.css';

const newsJson = require("../assets/news.json");
function newsArticle(title, author, publisher, link, date) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.date = date;
    this.link = link;
}

var myItems = [];
var key;
var item;
for( key in newsJson){
    var pushArt = new newsArticle(newsJson[key][0], newsJson[key][1], newsJson[key][2], newsJson[key][3], newsJson[key][4]);
    myItems.push(pushArt);
}


for(var item in myItems){
    var div = document.createElement('div');
    document.body.appendChild(div);
}



const News = () =>{
    return(
        <div>
            <h1>News</h1>
            
           <p>{myItems[0].title} {myItems[0].author} {myItems[0].publisher}</p>

        </div>
    );  
};

export default News;