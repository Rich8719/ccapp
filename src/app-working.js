import React, { Component } from 'react';
import * as faceapi from 'face-api.js'
// import Video from './components/video.js'
import Captions from './components/captions.js'
import './App.css';

const testVideo = 'assets/b99.mp4'

export default class App extends Component {

  constructor(props){
    super(props)
    this.canvas = React.createRef()
    this.video = React.createRef()
  }
  
  async componentDidMount(){
    await this.loadModels()
    console.log('loadModels done')

    const onPlay = async(videoEl) => {
      const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512 })
      const faceDetectionTask = faceapi.detectAllFaces(videoEl, options)
      const results = await faceDetectionTask
      console.log('face detection task done')

      const detectionsForSize = results.map(det => det.forSize(videoEl.width, videoEl.height))
      const canvas = this.canvas.current
      canvas.width = videoEl.width
      canvas.height = videoEl.height
      
      faceapi.drawDetection(canvas, detectionsForSize, {withBoxes: true})

      setTimeout(() => onPlay(videoEl))
    }

    onPlay(this.video.current)

  }
  
  async loadModels() {
    await faceapi.loadTinyFaceDetectorModel('/models')
    await faceapi.loadFaceLandmarkTinyModel('/models')
  }

  render() {
    return (
      <div className="video">
        <video id="inputVideo" ref={this.video} src={testVideo} width={720} height={405} autoPlay muted controls>
        </video>
        <canvas ref={this.canvas} id="overlay"></canvas>
        <Captions/>
      </div>
    )
  }
}