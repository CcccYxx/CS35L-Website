import axios from 'axios';
import React from 'react';
import './Home.css';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchString: "",
        };
    }

    handleChange(event){
        this.setState({
            searchString: event.target.value
        })   
    }

    handleSearchStringChange(event){
        if(event.charCode === 13){
            axios.get('/search/user/' + this.state.searchString)
            .then((res) => {
                console.log(res.data);
            })
        }
    }

    render(){
        return(
            <div className='welcome'>
                <div className='welcome-msg'> Welcome to Game-Website </div>
                <div className="searchbar_container">
                    <input type="text" className="searchbar" placeholder="Search for posts or people..." maxLength="40"
                     onChange={this.handleChange.bind(this)} onKeyPress={this.handleSearchStringChange.bind(this)}/>
                </div>
            </div>
        );  
    }
};

export default Home;