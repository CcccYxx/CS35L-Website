import React, { useState } from 'react';
import './BrowseGames.css';
import Select from 'react-select';
const axios = require('axios');

class BrowseGames extends React.Component {
    constructor(props) {
	super(props);
	this.state =
	{
	    constraints: 'fields name, summary, cover, rating, url, first_release_date; limit 10; where platforms = 6 & cover != null & rating != null;',
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
                        <img className="game_image" src={coverURL} height='180' width='180'/>                  
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
	console.log(this.state.constraints);
	const token_id = await axios.get('http://localhost:8080/get_token');
	console.log(token_id.data);
	const res = await axios.post('http://localhost:8080/browse_database', {query: this.state.constraints, token: token_id.data});
	console.log(res.data);
	this.setState({data: res.data});
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
      const res2 = await axios.post('http://localhost:8080/get_covers', {query: 'fields url; where id = ' + coverConstraints + ';', token: token_id.data});
      
      this.setState({coverURLs: res2.data})

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
      )
    }
  
}
export default BrowseGames;
