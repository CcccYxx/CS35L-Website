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
            Games: ['fortnite ', 'chess ', 'strategic games', 'multi-player'],
            image:"https://images.unsplash.com/photo-1484611941511-3628849e90f7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHBlb3BsZXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          };
    }
    handleChange = event => {
        this.setState({ image: event.target.value });
      };

    render() {
        return(
            <div className='cols'>
                <div className='top'>
                    <img 
                        border= '5px solid #555'
                        alt='did not load'
                        src={this.state.image}
                        style={{width:"200px", height:"200px", borderRadius:"80px"}}
                    />
                    <div className='usersummary'> 
                        <h1> Profile</h1>
                        <ul>
                            <li> Name - {this.state.name} </li>
                            <li> UserId - {this.state.id} </li>
                            <li> Email - {this.state.email} </li>
                            <li> Friends - {this.state.friends} </li>
                        </ul>
                    </div>
                    <div className='Games'> 
                        <h1> Top Games</h1>
                        <ul>
                            <li> {this.state.Games[0]}</li>
                            <li> {this.state.Games[1]}</li>
                            <li> {this.state.Games[2]}</li>
                            <li> {this.state.Games[3]}</li>
                        </ul>
                    </div>
                    <div>
                        <form>
                            <label>
                                change url:
                                <input type='text' value = {this.state.image} onChange={this.handleChange}/>
                            </label>
                        </form>
                    </div>
                </div>
                <div className='blogs'>
                    <h1> Blogs</h1>
                </div>
                <div className='chats'>
                    <h1> Friends</h1>
                </div>
            </div>
        );  
    }
};

export default Profile;