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
                }
            }
        }
    }
    async componentDidMount() {
        
        await this.loadModels()
        const track = async (videoEl) => {

            // const videoEl = this.props.videoId
            const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 608 })
            const faceDetectionTask = faceapi.detectAllFaces(videoEl, options)
            const detectFace = await faceDetectionTask
            const detectionsForSize = detectFace.map(det => det.forSize(videoEl.width, videoEl.height))
            
            //this needs to await video playing
            if (videoEl.paused || videoEl.ended) {    
                console.log('video not playing')
                return
            } else {            
                setTimeout(() => track(videoEl))
                
                detectionsForSize.forEach((detection, i) => {
                    this.setState({
                        position: {
                            style: {
                                left: detection._box._x,
                                top: detection._box._y,
                            }
                        }
                    })
                })
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
                <Captions/>
            </div>
        )
    }
}

export default Tracking