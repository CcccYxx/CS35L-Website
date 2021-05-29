import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';



class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            Name:'',
            email:'',
            id:'60b1c7baf77be76dd3b2c28b',
            Friends: [],
            Games: [],
            image:""
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
    componentDidMount() {
        axios.get('/api/profile/' + this.state.id)
            .then(({ data}) => this.setState({ Name: data.Name, email: data.Email, image: data.image, Games:data.Games })) // <-- set state
            .catch(e => console.log(e))
    }

    handleClick = event => {
        event.preventDefault();
        const newProfile = {
            image: this.state.image,
            Games: ["chess", "fortnite", "pokemon"],
            Name: this.state.Name,
            Email: this.state.email,
            Friends: [this.state.image, this.state.image]
        }
        axios.put('/profile/' + this.state.id, newProfile);

    }
    
    //Hide if user not logged in
    // componentDidMount() {
    //     fetch('/api/profile')
    //     .then(res => res.text())
    //     .then(res => this.setState({
    //         editing: true,
    //         Name:"",
    //         email:"",
    //         id:"",
    //         friends:"",
    //         Games: "",
    //         image: ""
    //     }))
    // }

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
                            <li> Email - {this.state.email} </li>
                        </ul>
                        : ( 
                        <form>
                            <ul>
                                <li> Name - <input type='text' value = {this.state.Name} onChange={this.nameChange}/> </li>
                                <li> Id - <input type='text' value = {this.state.id} onChange={this.idChange}/> </li>
                                <li> Email - <input type='text' value = {this.state.email} onChange={this.emailChange}/> </li>
                            </ul>
                        </form>
                        
                        )
                    }
                    <h1> Top Games</h1>
                    <div> 
                        {this.state.Games.map((game) => (
                            <p>{game}</p>
                        ))}
                    </div>
                </div>
                <div className='blogs'>
                    <h1> Posts</h1>
                </div>
                <div className='Friends'>
                    <h1> Friends</h1>
                    <img src={this.state.image} style={{width:"100px", height:"100px", borderRadius:"30px"}} />
                    {this.state.Friends.map((image) => (
                                <img 
                                    src = {image}
                                    style={{width:"100px", height:"100px", borderRadius:"30px"}}
                                />
                        ))}
                </div>
            </div>
        );  
    }
};

export default Profile;