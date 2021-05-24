import React from 'react';
import './BrowseGames.css';

class BrowseGames extends React.Component {
    constructor() {
      super();
      this.state = {  token: -1,
                      data: []
      }
    }
  
    showData() {
      const gameData = this.state.data;
      var name;
      var summary;
      var url;
  
      return (
        <div>
            {gameData.map((item, idnex) => {
              name = item.name;
              summary = item.summary;
              url = item.url
  
              return (
                <ul>
                  <li>{name}</li>
                  <li>{summary}</li>
                  <li>{url}</li>
                </ul>
              );
            })}
        </div>
      );
    }
  
    async componentDidMount() {
      const tokenAddress = 'https://id.twitch.tv/oauth2/token?client_id=xmj854p8ubogtijgavxucipsk4l0ww&client_secret=qneu0v93g7ui3jved22fpebwgtb0xh&grant_type=client_credentials';
      const response1 = await fetch(tokenAddress, {method: 'POST'});
      const obj1 = await response1.json();
      this.setState({token: obj1.access_token});
      console.log(obj1);
  
      var bearer = 'Bearer ' + this.state.token;          // Use this instead to get a new token every time
      //var bearer = 'Bearer 2nzipv8kxr5xe4hoch8a50515vucbs'; // Bearer token
                                                            // This token is set during testing to prevent too many request.
                                                            // Remember to replace the token when you test
                                                            // One token will expire in around 6 days
      const dataAddress = 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games'; // Create a proxy to get around CORS
      const response2 = await fetch(dataAddress, {
        method: 'POST',
        headers: new Headers({
          'Client-ID': 'xmj854p8ubogtijgavxucipsk4l0ww',
          'Authorization': bearer,
          'Retry-After': '3600'
        }),
        body: 'fields *; limit 10;', // This means get all information from 10 games
      });
      const obj2 = await response2.json();
      this.setState({data: obj2});
  
      console.log(this.state.data);
    }
  
    render() {
      return (
        <div>
          {this.showData()}
        </div>
      );
    }
  }

export default BrowseGames;