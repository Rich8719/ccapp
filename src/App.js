import React, { Component } from 'react'
import './App.css'
import Video from './components/video.js'

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = { videoStatus: null }
    this.onVideoLoad = this.onVideoLoad.bind(this)
  }
  
  onVideoLoad = (videoStatus) => {
    this.setState({videoStatus: videoStatus})
  }
  
  
  render() {
    return (
      <div className="App">
        <Video onVideoLoad = {this.onVideoLoad}/>
      </div>
    );
  }
}

export default App;