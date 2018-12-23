import React, { Component } from 'react';
import './App.css';
import Tracking from './components/tracking.js'
import Video from './components/video.js'
import Captions from './components/captions.js'

class App extends Component {
  render() {
    const video = 'inputVideo'
    return (
      <div className="App">
        <Video/>
        {/* <Tracking video = {video}/> */}
        <Captions/>
      </div>
    );
  }
}

export default App;