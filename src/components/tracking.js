import React, {Component} from 'react'
import * as faceapi from 'face-api.js'
import './tracking.css'

class Tracking extends Component {
    
    async componentDidMount() {
        await this.loadModels()
        this.track(document.getElementById(this.props.videoEl))
    }

    loadModels = async () => {
        await faceapi.loadTinyFaceDetectorModel('/models')
        await faceapi.loadFaceLandmarkTinyModel('/models')
    }

    // this needs to await video playing
    track = async (videoEl) => {     
        const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 608, scoreThreshold:.7 })
        const faceDetectionTask = faceapi.detectAllFaces(videoEl, options)
        const detectFace = await faceDetectionTask
        const detectionsForSize = detectFace.map(det => det.forSize(videoEl.width, videoEl.height))

        // console.log(detectionsForSize)
      
        detectionsForSize.forEach((detection) => {                  
            this.props.trackingState({
                style: {
                    left: Math.ceil(detection._box._x / 80) * 80,
                    top: Math.ceil(detection._box._y / 100) * 100,
                }
            })
        })  
    }

    componentDidUpdate(prevProps){
        if(this.props.isNextSpeaker !== prevProps.isNextSpeaker) {
            this.track(document.getElementById(this.props.videoEl))
            console.log('update track')
        }
    }

    render(){
        const video = document.getElementById(this.props.videoEl)
        return (
            // null
            <button onClick={ () => this.track(video)}>Track Test</button>
        )
    }
}

export default Tracking