import React, {Component} from 'react'
import './video.css'
import Tracking from './tracking'
import Captions from './captions'

const videoEl = 'inputVideo'
const startTime = Date.now()

class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videoLoadStatus: 'loading',
            videoPlayStatus: 'Stopped',
            currentTime: 0,

        }
        this.tracking = React.createRef()
    }
    
    async handleOnLoad () {
        await this.props.onVideoLoad('loaded')
        this.setState({videoLoadStatus: 'loaded'})
    }

    componentDidMount() {
        const video = document.getElementById(videoEl)
        
        // should stop tracking and captions functions and log time so they know where to restart
        const onPause = () => {
            video.onpause = () => {
                let currentTime = Math.ceil((Date.now() - startTime) / 10) * 10
                this.setState({ currentTime: currentTime, videoPlayStatus: 'Paused' })
                // console.log(`Paused at: ${currentTime}ms`);
                
            }
        }

        const onPlay = () => {
            video.onplay = () => {
                let currentTime = Math.ceil((Date.now() - startTime) / 10) * 10
                this.setState({ currentTime: currentTime, videoPlayStatus: 'Play' })
                // console.log(`Played at: ${currentTime}ms`);
            }
        }

        onPause()
        onPlay()
    }
    
    handleError() {
        this.setState({ videoLoadStatus: 'failed'})
    }

    // onPlay = () => {
    //     this.tracking.current.childFunction()
    // }
    
    render() {
        return (
        <div>
            <video src="assets/b99.mp4" onLoadStart={this.handleOnLoad.bind(this)} onError={this.handleError.bind(this)} id={videoEl} width={720} height={405} autoPlay muted controls onPlay={this.onPlay} onPause={this.onPause}></video>
            <Tracking ref={this.tracking} videoId={videoEl} videoLoadStatus = {this.state.videoLoadStatus} videoPlayStatus = {this.state.videoPlayStatus} currentTime = {this.state.currentTime}/>
            {/* <Captions videoPlayStatus={this.props.videoPlayStatus} currentTime={this.props.currentTime} /> */}
        </div>
        )
    }
}

export default Video