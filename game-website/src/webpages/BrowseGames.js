import React, { useState } from 'react';
import './BrowseGames.css';
import Select from 'react-select'

class BrowseGames extends React.Component {
    constructor() {
      super();
      this.state = {  constraints: 'fields name, summary, url; limit 10; where platforms = 6;',
                      data: []
      }
    }

    displayPlatformsSelect() {
      const options = [
        { value: '6', label: 'PC' },
        { value: '9', label: 'PS3' },
        { value: '48', label: 'PS4' },
        { value: '12', label: 'XBox 360' },
        { value: '49', label: 'XBox One' }
      ]
      return (
        <div>
          <lable>
            Select a platform
          </lable>
          <Select
            name="platforms"
            options={options}
            onChange={(e) => {
              this.setState({
                constraints: 'fields name, summary, url; limit 10; where platforms = ' + e.value + ';'
              })
              this.componentDidMount();
            }}
          />
        </div>
      )
    }

    displayData() {
      const gameData = this.state.data;
      var name;
      var summary;
      var url;
      var platforms;
      var cover;
      var genre;
  
      return (
        <div>
            {gameData.map((item) => {
              name = item.name;
              summary = item.summary;
              url = item.url;
              platforms = item.platforms;
              cover = item.cover;
              genre = item.genre;
  
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
      const token = obj1.access_token;
      //console.log(token);
  
      //var bearer = 'Bearer ' + token;          // Use this instead to get a new token every time
      var bearer = 'Bearer 6m6d2bqdwq0okay5pnqiapc6ydkkgk'; // Bearer token
                                                            // This token is set during testing to prevent too many request.
                                                            // Remember to replace the token when you test
                                                            // One token will expire in around 6 days
      const authenticationInfo = {
        'Client-ID': 'xmj854p8ubogtijgavxucipsk4l0ww',
        'Authorization': bearer
      }

      const dataAddress = 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games'; // Create a proxy to get around CORS
      const response2 = await fetch(dataAddress, {
        method: 'POST',
        headers: authenticationInfo,
        body: this.state.constraints, // This means get all information from 10 games
      });
      const obj2 = await response2.json();
      this.setState({data: obj2});
    }
    
    render() {
      return (
        <div>
          {this.displayPlatformsSelect()}
          {this.displayData()}
        </div>
      );
    }
  }

export default BrowseGames;