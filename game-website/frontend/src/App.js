import React from 'react';
import Webpages from './webpages'
import './App.css';
import NavBar from './Components/NavBar/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Webpages />
    </div>
  );
}

export default App;
