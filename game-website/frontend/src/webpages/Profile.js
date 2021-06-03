import React, { Component } from 'react';
import axios from 'axios';
import update from 'react-addons-update';
import './Profile.css';



class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            bio: '',
            editing: true,
            Name:'',
            Email: props.Email,
            Friendids: [],
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
    bioChange = event => {
        this.setState({ bio: event.target.value });
    };

    updatefriends () {
        for (let i = 0; i < this.state.Friendids.length; i++) {
            axios.get('/api/profile/email/' + this.state.Friendids[i])
                .then(({ data}) => this.setState(update(this.state, {
                    Friends: {
                        [i]: {
                            $set: data
                        }
                    }
                })))
                .catch(e => console.log(e))
        }
    }
    editingClick = event => {
        this.setState({ editing: !this.state.editing });
    }
    saveClick = event => {
        this.setState({ editing: !this.state.editing });
        this.updatefriends();

        const newProfile = {
            bio: this.state.bio,
            people: this.state.people,
            image: this.state.image,
            Games: this.state.Games,
            Name: this.state.Name,
            Email: this.state.Email,
            Friendids: this.state.Friendids,
            Friends: this.state.Friends
        }
        axios.put('/profile/' + newProfile.Email, newProfile);
    }

    componentDidMount() {
        axios.get('/api/profile/email/' + this.state.Email)
            .then(({ data}) => this.setState({ Friends: data.Friends, people: data.people, Friendids: data.Friendids, Name: data.Name, image: data.image, Games: data.Games, bio: data.bio })) 
            .catch(e => console.log(e))
        axios.get('/profiles')
            .then(({data}) => this.setState({people: data}))
    }
  

    render() {
        return(
            <div className='cols'>
                <div className='top'>
                    <div className="image">
                        <img 
                            border= '2px solid #555'
                            alt='did not load'
                            src={this.state.image}
                            style={{width:"200px", height:"200px", borderRadius:"60px"}}
                        />
                    </div>
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
                    {this.state.editing ? <button onClick={this.editingClick}>edit profile</button> :
                    (<button onClick={this.saveClick}>save changes</button>)
                    }
                </div>
                <div className='Profile'>
                    <h1> Info</h1>
                    {this.state.editing ? 
                        <div>
                            <p> Name - {this.state.Name} </p>
                            <p> Email - {this.state.Email} </p>
                            <p> {this.state.bio} </p>
                        </div>
                        : ( 
                        <form>
                            <p> Name - <input type='text' value = {this.state.Name} onChange={this.nameChange}/> </p>
                            <p> Bio - <input type='text' value = {this.state.bio} onChange={this.bioChange}/> </p>
                        </form>
                        
                        )
                    }
                    <h1> Top Games</h1>
                    {this.state.editing ? 
                    <div> 
                        {this.state.Games.map((game) => (
                            <p>{game}</p>
                        ))}
                    </div> : 
                    (<div> 
                        {this.state.Games.map((game, index) => (
                            <input type='text' value = {game} onChange={e => {
                                this.setState(update(this.state, {
                                    Games: {
                                        [index]: {
                                            $set: e.target.value
                                        }
                                    }
                                }));
                            }}/>
                        ))}
                        <input type="button" onClick={e => {
                            this.setState({ Games: [...this.state.Games, ""]})
                        }} value="Add Game" />
                        <input type="button" onClick={e => {
                            this.setState({
                                Games: this.state.Games.splice(1)
                            });
                        }} value="Delete first Game" />
                    </div>)
                    }
                </div>
                <div className='Friends'>
                    <h1> Friends</h1>
                    {this.state.editing ? (
                        this.state.Friends.map((friend, index) => (
                            <div>
                                <img 
                                    alt="no image"
                                    src={friend.image}
                                    border= '1px solid #555'
                                    style={{width:"100px", height:"100px", borderRadius:"30px"}}
                                    key={index}
                                 />
                                <p>{friend.Name}</p>
                                <p>{friend.Email}</p>
                                <p>{friend.bio}</p>
                                <medium>Games: </medium>
                               {friend.Games.map((game) =>  
                                    <medium> {game} </medium>
                                )}         
                                <h5></h5>
                   
                            </div>
                            ))
                    )
                    
                    : ( <div>
                        {this.state.Friendids.map((id, index) => (
                            <input type='text' value = {id} onChange={e => {
                                this.setState(update(this.state, {
                                    Friendids: {
                                        [index]: {
                                            $set: e.target.value
                                        }
                                    }
                                }));
                            }}/>
                        ))}
                        <input type="button" onClick={e => {
                            this.setState({ Friendids: [...this.state.Friendids, ""]})
                        }} value="Add Friend" />
                        <input type="button" onClick={e => {
                            this.setState({
                                Friendids: this.state.Friendids.splice(1),
                                Friends: this.state.Friends.splice(1)
                            });
                        }} value="Delete first friend" />
                        <div>
                            <h1>People: </h1>
                            {this.state.people.map((person) => (
                                <div>
                                    <medium>EMAIL: {person.Email} </medium>
                                    <medium>GAMES: </medium>
                                    {person.Games.map((game) =>  
                                        <medium> {game} </medium>
                                    )}    
                                </div>
                                ))}
                        </div>
                    </div>
                    )
                    }
                </div>
            </div>
        );  
    }
};

export default Profile;