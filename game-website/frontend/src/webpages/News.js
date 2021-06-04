import React from 'react';
import './News.css';
import {Link} from 'react-router-dom';
const axios = require('axios');

function newsArticle(key, title, author, publisher, date, link) {
    this.id = key;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.date = date;
    this.link = link;
}


async function getNews(){
    const response = await axios.get('http://localhost:8080/news_api');
    const data = response.data;
    return data;
};

var news_json;
var myItems = [];
var key;
async function get_json(){
    news_json = await getNews();
    for (key in news_json.articles) {
        console.log(news_json.articles[key]);
        myItems.push(new newsArticle(news_json.articles[key], news_json.articles[key].title, news_json.articles[key].author, news_json.articles[key].source.name, news_json.articles[key].publishedAt, news_json.articles[key].url));
    }
}
//news_json = getNews();
get_json();
//alert(Json.parse(news_json));


class News extends React.Component{
    constructor(props){
        super(props);
        this.newsList = React.createRef();
    }

    render(){
        const news = myItems.map((items) => {
            return( //return list for now, can change those if needed 
                <ul className="newlist">
                    <li className="news-block" key={items.id} >
                        <h2 className="news-title"><Link to={{pathname:items.link}} target="_blank" className="news-link">{items.title}</Link></h2>
                        <p className="author-publisher">{items.author}, {items.publisher}</p>
                    </li>
                </ul>
            )
        });

        return(
        <div className="newsPage">
            <ul className="newsList">
                {news}
            </ul>
        </div>
        )
    }
};

export default News;
