import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';



class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            Name:'Jerry Smith',
            email:'johnsmith@email.com',
            id:'johnsmith1234',
            friends:'6',
            Games: ['fortnite ', 'chess ', 'strategic games', 'multi-player'],
            image:"https://images.unsplash.com/photo-1484611941511-3628849e90f7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHBlb3BsZXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          };
    }
    handleChange = event => {
        this.setState({ image: event.target.value });
      };
    nameChange = event => {
        this.setState({ Name: event.target.value });
    };
    idChange = event => {
        this.setState({ id: event.target.value });
    };
    emailChange = event => {
        this.setState({ email: event.target.value });
    };
    editingClick = event => {
        this.setState({ editing: !this.state.editing });
    };
       
    handleClick = event => {
        event.preventDefault();
        const newProfile = {
            id: this.state.id,
            image: this.state.image,
            Games: this.state.Games,
            Name: this.state.Name
        }
        axios.post('/profile', newProfile);

    }

    render() {
        return(
            <div className='cols'>
                <div className='top'>
                    <img 
                        border= '5px solid #555'
                        alt='did not load'
                        src={this.state.image}
                        style={{width:"200px", height:"200px", borderRadius:"60px"}}
                    />
                    <div>
                        {this.state.editing ? <h4></h4> : 
                            (<form>
                                <label>
                                    change url: 
                                    <input type='text' value = {this.state.image} onChange={this.handleChange}/>
                                </label>
                            </form>)
                        }   
                    </div>
                    <button onClick={this.handleClick}>post info in database</button>
                    {this.state.editing ? <button onClick={this.editingClick}>edit profile</button> :
                    (<button onClick={this.editingClick}>save changes</button>)
                    }
                </div>
                <div className='Profile'>
                    <h1> Info</h1>
                    {this.state.editing ? 
                        <ul>
                            <li> Name - {this.state.Name} </li>
                            <li> UserId - {this.state.id} </li>
                            <li> Email - {this.state.email} </li>
                            <li> Friends - {this.state.friends} </li>
                        </ul>
                        : ( 
                        <form>
                            <ul>
                                <li> Name - <input type='text' value = {this.state.image} onChange={this.nameChange}/> </li>
                                <li> Id - <input type='text' value = {this.state.id} onChange={this.idChange}/> </li>
                                <li> Email - <input type='text' value = {this.state.email} onChange={this.emailChange}/> </li>
                            </ul>
                        </form>
                        
                        )
                        
                    }
                    <h1> Top Games</h1>
                    <div> 
                        <ul>
                            <li> {this.state.Games[0]}</li>
                            <li> {this.state.Games[1]}</li>
                            <li> {this.state.Games[2]}</li>
                            <li> {this.state.Games[3]}</li>
                        </ul>
                    </div>
                </div>
                <div className='blogs'>
                    <h1> Posts</h1>
                </div>
                <div className='chats' >
                    <h1> Messages </h1>
                    <h4> Inbox </h4>
                    <h4> Send Message </h4>
                </div>
                <div className='Friends'>
                    <h1> Add Friends</h1>
                </div>
            </div>
        );  
    }
};

export default Profile;