import React, { Component } from 'react';
import './App.css';
import Video from './components/video.js'
import Captions from './components/captions.js'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Video/>
      <Captions/>
      </div>
    );
  }
}

export default App;
