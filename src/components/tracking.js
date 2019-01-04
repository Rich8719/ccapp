import React, {Component} from 'react'
import * as faceapi from 'face-api.js'
import './tracking.css'
import Captions from './captions'

class Tracking extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            position: {
                style: {
                    left: '0',
                    top: '0'
                },
            nextSpeaker: null,
        }
    }}

    //need to call the tracking function based on this function. If true do new track if false use old one.
    // if new speaker not on screen, send to last known position. Could set state as speaker position?
    
    isNextSpeaker = (speaker) => {
        this.setState({nextSpeaker: speaker})
        // console.log(this.state)
    }

    //returns 'childFunction' not defined
    // childFunction = () => {
    //     return setTimeout(() => childFunction())
    // }
    
    async componentDidMount() {
        await this.loadModels()

        const childFunction = () => {
            console.log('Child function working')
            return setTimeout(() => childFunction())
        }

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
                    this.setState({
                        position: {
                            style: {
                                left: Math.ceil(detection._box._x / 80) * 80,
                                top: Math.ceil(detection._box._y / 100) * 100,
                            }
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
        return (
            <div className="word" style={this.state.position.style}>
                <Captions isNextSpeaker={this.isNextSpeaker} videoPlayStatus={this.props.videoPlayStatus} currentTime={this.props.currentTime} />
            </div>
        )
    }
}

export default Tracking