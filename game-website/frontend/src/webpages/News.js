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

class News extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newsList: []
        }
    }

    async getNews(){
        const response = await axios.get('http://localhost:8080/news_api');
        const data = response.data;
        return data;
    };

    async componentDidMount() {
        var news_json;
        var myItems = [];
        var key;

        news_json = await this.getNews();
        for (key in news_json.articles) {
            myItems.push(new newsArticle(news_json.articles[key], news_json.articles[key].title, news_json.articles[key].author, news_json.articles[key].source.name, news_json.articles[key].publishedAt, news_json.articles[key].url));
        }
        this.setState({
            newsList: myItems
        });
    }

    displayNews() {
        const newsData = this.state.newsList;
        return (
            <div>
                {newsData.map((item) => {
                    return (
                        <ul className="newlist">
                            <li className="news-block" key={item.id} >
                                <h2 className="news-title"><Link to={{pathname:item.link}} target="_blank" className="news-link">{item.title}</Link></h2>
                                <p className="author-publisher">{item.author}, {item.publisher}</p>
                            </li>
                        </ul>
                    )
                })}
            </div>
        );
    }

    render(){
        return(
            <div className="newsPage">
                {this.displayNews()}
            </div>
        )
    }
};

export default News;
