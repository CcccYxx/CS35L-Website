import React from 'react';
import ReactDOM from 'react-dom';
import './News.css';
import {Link} from 'react-router-dom'
const newsJson = require("../assets/news.json");
function newsArticle(title, author, publisher, date, link) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.date = date;
    this.link = link;
}

var myItems = [];
var key;
for( key in newsJson){
    var pushArt = new newsArticle(newsJson[key][0], newsJson[key][1], newsJson[key][2], newsJson[key][3], newsJson[key][4]);
    myItems.push(pushArt);
}

class News extends React.Component{
    constructor(props){
        super(props);
        this.newsList = React.createRef();
    }

    render(){
        const news = myItems.map((items) => {
            return( //return list for now, can change those if needed 
                <ul class="newlist">
                    <li className="newsBlock" key={items.title} >
                        <h2 className="title"><Link to={{pathname:items.link}} target="_blank">{items.title}</Link></h2>
                        <p className="author-publisher">Author: {items.author} Publisher: {items.publisher}</p>
                    </li>
                </ul>
            )
        });

        return(
        <div className="newsPage">
            <h1 className='header'>News</h1>
            <ul className="newsList">
                {news}
            </ul>
        </div>
        )
    }
};

export default News;