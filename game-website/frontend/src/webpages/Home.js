import axios from 'axios';
import React from 'react';
import './Home.css';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchString: "",
            posts: [],
            users: [],
            displaySearchResult: false
        };
    }

    handleChange(event){
        this.setState({
            searchString: event.target.value
        })   
    }

    handleSearchStringChange(event){
        if(event.charCode === 13 && event.target.value){
            axios.get('/search/user/' + this.state.searchString)
            .then((res) => {
                if(res.status === 200){
                    this.setState({
                        users: res.data,
                        displaySearchResult: true
                    })
                }else if(res.status === 404){
                    alert('Error when searching')
                }
            })
            axios.get('/search/post/' + this.state.searchString)
            .then((res) => {
                if(res.status === 200){
                    this.setState({
                        posts: res.data,
                        displaySearchResult: true
                    })
                }else if(res.status === 404){
                    alert('Error when searching')
                }
            })
        }
    }

    render(){
        return(
            <div className='welcome'>
                <div className="homePageContainer">
                    <div className={this.state.displaySearchResult ? 'hide' : 'welcome-msg'}> Welcome to Game-Website </div>
                    <div className="searchbar_container">
                        <input type="text" className="searchbar" placeholder="Search for posts or people..." maxLength="40"
                        onChange={this.handleChange.bind(this)} onKeyPress={this.handleSearchStringChange.bind(this)}/>
                    </div>

                </div>
            </div>
        );  
    }
};

export default Home;