import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name:'John Smith',
            email:'johnsmith@email.com',
            password:'password',
            id:'johnsmith1234',
            friends:'6',
            interests:'fortnite, chess, strategic games',
            image:"https://images.unsplash.com/photo-1484611941511-3628849e90f7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHBlb3BsZXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          };
    }
    handleChange = event => {
        this.setState({ image: event.target.value });
      };

    render() {
        return(
            <div>
                <div id="Header">
                    <img 
                        alt='image did not load'
                        src={this.state.image}
                        style={{width:"180px", height:"180px", borderRadius:"80px"}}
                    />
                    <h1> Name: {this.state.name} </h1>
                    <h1> UserId: {this.state.id} </h1>
                    <h1> Friends: {this.state.friends} </h1>
                    <h1> Interests: {this.state.interests} </h1>
                    <input type='text' value = {this.state.image} onChange={this.handleChange}/>

                </div>
            </div>
        );  
    }
};

export default Profile;