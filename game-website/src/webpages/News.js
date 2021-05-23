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

function parseJson(){
    var myItems = [];
    var key;
    var item;
    for( key in newsJson){
        var pushArt = new newsArticle(newsJson[key][0], newsJson[key][1], newsJson[key][2], newsJson[key][3], newsJson[key][4]);
        myItems.push(pushArt);
    }

    var toAdd = document.createDocumentFragment();
    for(var item in myItems){
        var newDiv = document.createElement('div');
        newDiv.id = 'art'+item;
        newDiv.className = 'articles';
        toAdd.appendChild(newDiv);
    }
    document.getElementById("newsList").appendChild(toAdd);
}

const News = () =>{
    return(
        <div>
            <h1>News</h1>
            <div id = "newsList">
                {parseJson}
            </div>
        </div>
    );  
};

export default News;