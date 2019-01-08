import React, {Component} from 'react'
import './video.css'
import Tracking from './tracking'
import Captions from './captions'

const videoEl = 'inputVideo'
const startTime = Date.now()

class Video extends Component {
    constructor(props) {
        super(props)
        this.tracking = React.createRef()
        this.state = {
            videoLoadStatus: 'loading',
            videoPlayStatus: 'stopped',
            currentTime: 0,
            position: {}
        }
    }
    
    
    handleLoad = () => {
        this.setState({ videoLoadStatus: 'loaded'})
    }
    
    handleError = () => {
        this.setState({ videoLoadStatus: 'failed'})
    }

    handlePlay = () => {
        this.setState( { videoPlayStatus: 'play'} )
    }

    handlePause = () => {
        let currentTime = Math.ceil((Date.now() - startTime) / 10) * 10
        this.setState({ currentTime: currentTime, videoPlayStatus: 'pause' })
    }

    handleEnd = () => {
        this.setState({ videoPlayStatus: 'stopped'})
    }

    //state passed from tracking.js
    trackingState = (position) => {
        this.setState({ position: position })
    }

    // Use to determine whether to fire track again
    isNextSpeaker = (speaker) => {
        this.setState({ nextSpeaker: speaker })
        console.log(this.state)
    }
    
    render() {
        return (
        <div>
            <video src="assets/b99.mp4" onLoadStart={this.handleLoad} onError={this.handleError} id={videoEl} width={720} height={405} autoPlay muted controls onPlay={this.handlePlay} onPause={this.handlePause} onEnded={this.handleEnd}></video>
            <Tracking ref={this.tracking} videoEl={videoEl} videoLoadStatus = {this.state.videoLoadStatus} videoPlayStatus = {this.state.videoPlayStatus} currentTime = {this.state.currentTime} trackingState = {this.trackingState}/>
                <Captions videoLoadStatus={this.state.videoLoadStatus} videoPlayStatus={this.state.videoPlayStatus} currentTime={this.state.currentTime} position={this.state.position.style}/>
        </div>
        )
    }
}

export default Video