import React from 'react';
import ReactDOM from 'react-dom';
import './News.css';


const newsJson = require("../assets/news.json");
function newsArticle(title, author, publisher, link, date) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.date = date;
    this.link = link;
}

class newsPage extends React.Component{
    constructor(){
        super();
            this.state ={
                content: "Display"
            }
    }


}

function parseJson(){
    var myItems = [];
    var key;
    for(key in newsJson){
        var pushArt = new newsArticle(newsJson[key][0], newsJson[key][1], newsJson[key][2], newsJson[key][3], newsJson[key][4]);
        myItems.push(pushArt);
    }

    var newsDiv = document.createElement('div');
    newsDiv.id = "newsList";
    document.body.appendChild(newsDiv);
    var toAdd = document.createDocumentFragment();
    
    for(var i = 0; i < myItems.length;  i++){
        
        var newDiv = document.createElement('div');
        newDiv.id = 'art'+i;
        newDiv.className = 'articles';
        newDiv.innerHTML = myItems[i].title;
        toAdd.appendChild(newDiv);
    }
    alert("ONCE");
    newsDiv.appendChild(toAdd);
}

const News = () =>{
    return(
        <div>
            <h1>News</h1>
                <newsPage>
                    {parseJson()}
                </newsPage>
        </div>
    );  
};

export default News;