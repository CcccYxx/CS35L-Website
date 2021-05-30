import React, { Component } from 'react';
import axios from 'axios';
import update from 'react-addons-update';
import './Profile.css';



class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            Name:'',
            email:'',
            id:'60b1c7baf77be76dd3b2c28b',
            Friends: ["60b2c15fd47083e6ee4a975f", "60b1c8a43e5f716e4a165b69"],
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
    emailChange = event => {
        this.setState({ email: event.target.value });
    };
    editingClick = event => {
        this.setState({ editing: !this.state.editing });
    };
    componentDidMount() {
        axios.get('/api/profile/' + this.state.id)
            .then(({ data}) => this.setState({ Friends: data.Friends, Name: data.Name, email: data.Email, image: data.image, Games:data.Games })) // <-- set state
            .catch(e => console.log(e))
    }

    handleClick = event => {
        this.setState({ editing: !this.state.editing });
        event.preventDefault();
        const newProfile = {
            image: this.state.image,
            Games: this.state.Games,
            Name: this.state.Name,
            Email: this.state.email,
            Friends: this.state.Friends
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
                    (<button onClick={this.handleClick}>save changes</button>)
                    }
                </div>
                <div className='Profile'>
                    <h1> Info</h1>
                    {this.state.editing ? 
                        <div>
                            <p> Name - {this.state.Name} </p>
                            <p> Email - {this.state.email} </p>
                        </div>
                        : ( 
                        <form>
                            <p> Name - <input type='text' value = {this.state.Name} onChange={this.nameChange}/> </p>
                            <p> Email - <input type='text' value = {this.state.email} onChange={this.emailChange}/> </p>
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
                <div className='blogs'>
                    <h1> Posts</h1>
                </div>
                <div className='Friends'>
                    <h1> Friends</h1>
                    {this.state.Friends.map((image, index) => (
                    <p>
                        <img 
                            src={image}
                            border= '1px solid #555'
                            style={{width:"100px", height:"100px", borderRadius:"30px"}}
                            key={index}
                         />
                    </p>
                    ))}
                </div>
            </div>
        );  
    }
};

export default Profile;