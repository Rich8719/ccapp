import React, { Component } from 'react'
import './App.css'
import Video from './components/video.js'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Video onVideoLoad = {this.onVideoLoad}/>
      </div>
    );
  }
}

export default App;