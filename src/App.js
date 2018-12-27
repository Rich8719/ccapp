import React, { Component } from 'react';
import './App.css';
import Tracking from './components/tracking.js'
import Video from './components/video.js'
import Captions from './components/captions.js'

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = { videoStatus:'' }
    this.onVideoLoad = this.onVideoLoad.bind(this)
  }

  onVideoLoad(videoStatus) {
    this.setState({videoStatus})
  }
  
  render() {
    const video = 'inputVideo'
    
    return (
      <div className="App">
        <Video onVideoLoad = {this.onVideoLoad}/>
        {/* <Tracking video = {video}/> */}
        <Captions videoStatus = {this.state}/>
      </div>
    );
  }
}

export default App;