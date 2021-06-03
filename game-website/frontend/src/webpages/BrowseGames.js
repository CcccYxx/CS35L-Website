import React, { useState } from 'react';
import './BrowseGames.css';
import Select from 'react-select';

class BrowseGames extends React.Component {
    constructor() {
      super();
      this.state = {constraints: 'fields name, summary, cover, rating, url, first_release_date; limit 10; where platforms = 6 & cover != null & rating != null;',
                    data: [],
                    coverURLs: []
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
                constraints: 'fields name, summary, cover, rating, url, first_release_date; limit 10; where platforms = ' + e.value + ' & cover != null & rating != null;'
              });
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
      var coverURL;
      var rating;
      var url;
      var date;

      return (
        <div>
            {gameData.map((item) => {
              name = item.name;
              summary = item.summary;
              coverURL = item.coverURL;
              rating = item.rating;
              url = item.url;
              date = item.first_release_date;
              date = new Date(date * 1000);
              date = date.toLocaleDateString()

              return (
                <div className='one_game'>
                  <table>
                    <tr>
                      <td>
                        <img className="game_image" src={coverURL} height='300' width='300'/>                  
                      </td>
                      <td>
                        <h2>{name}</h2>
                        <p className="game_info">Rating: {rating}</p>
                        <p className="game_info">Released date: {date}</p>
                        <p className="game_info">Summmary: {summary}</p>
                        <p className="game_info">
                          Credited to:
                          <a href={url}> IDGB</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
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
  
      const bearer = 'Bearer ' + token;          // Use this instead to get a new token every time
      const authenticationInfo = {
        'Client-ID': 'xmj854p8ubogtijgavxucipsk4l0ww',
        'Authorization': bearer
      };

      const dataAddress = 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games'; // Create a proxy to get around CORS
      const response2 = await fetch(dataAddress, {
        method: 'POST',
        headers: authenticationInfo,
        body: this.state.constraints,
      });
      const obj2 = await response2.json();
      this.setState({data: obj2});

      const coverAddress = 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/covers';
      //Get an array of cover ids of the games
      var coverIDs = [];
      for (var i = 0; i < this.state.data.length; i++) {
        coverIDs.push(this.state.data[i].cover);
      }

      //Create a cover constraints to get url for the covers
      var coverConstraints = '(';
      for (var i = 0; i < (coverIDs.length - 1); i++) {
        coverConstraints += coverIDs[i] + ', ';
      }
      coverConstraints += coverIDs[coverIDs.length - 1] + ')';

      const response3 = await fetch(coverAddress, {
        method: 'POST',
        headers: authenticationInfo,
        body: 'fields url; where id = ' + coverConstraints + ';'
      });
      const obj3 = await response3.json();
      this.setState({coverURLs: obj3})

      const gameData = this.state.data;
      const coverData = this.state.coverURLs;
      for (var i = 0; i < gameData.length; i++) {
        for (var j = 0; j < coverData.length; j++) {
          if (gameData[i].cover == coverData[j].id) {
            gameData[i].coverURL = coverData[j].url;
          }
        }
      }
      this.setState({data: gameData});

      console.log(this.state.data)
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