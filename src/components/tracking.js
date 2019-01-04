import React, {Component} from 'react'
import * as faceapi from 'face-api.js'
import './tracking.css'
// import Captions from './captions'

class Tracking extends Component {
    
    constructor(props) {
        super(props)
    }

    //Use to determine whether to fire track again
    //isNextSpeaker = (speaker) => {
        // this.setState({nextSpeaker: speaker})
        // console.log(this.state)
    // }
    
    async componentDidMount() {
        await this.loadModels()

        const track = async (videoEl) => {           
            const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 608, scoreThreshold:.7 })
            const faceDetectionTask = faceapi.detectAllFaces(videoEl, options)
            const detectFace = await faceDetectionTask
            const detectionsForSize = detectFace.map(det => det.forSize(videoEl.width, videoEl.height))
            
            //this needs to await video playing
            if (this.props.videoLoadStatus === 'Loading') {
                return setTimeout(() => track(videoEl))
            }
            else if (this.props.videoPlayStatus === 'Paused') {   
                return setTimeout(() => track(videoEl))

            } else if (this.props.videoPlayStatus === 'Play') {       
                detectionsForSize.forEach((detection) => {                  
                    this.props.trackingState({
                        style: {
                            left: Math.ceil(detection._box._x / 80) * 80,
                            top: Math.ceil(detection._box._y / 100) * 100,
                        }
                    })
                })
                setTimeout(() => track(videoEl))
            }       
        }    
        track(document.getElementById(this.props.videoId))
    }
    
    async loadModels(){
        await faceapi.loadTinyFaceDetectorModel('/models')
        await faceapi.loadFaceLandmarkTinyModel('/models')
    }

    render(){
        return (null)
        // return (
        //     <div className="word" style={this.state.position.style}>
        //         <Captions isNextSpeaker={this.isNextSpeaker} videoPlayStatus={this.props.videoPlayStatus} currentTime={this.props.currentTime} />
        //     </div>
        // )
    }
}

export default Tracking