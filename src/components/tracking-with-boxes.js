import React, { Component } from 'react';
import * as faceapi from 'face-api.js'
import './tracking.css'
import { FaceDetection } from 'face-api.js';

class Tracking extends Component {

    constructor(props) {
        super(props)
        this.canvas = React.createRef()
        this.video = React.createRef()
    }

    async componentDidMount() {
        await this.loadModels()

        const track = async (videoEl) => {
            const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 608 })
            const faceDetectionTask = faceapi.detectAllFaces(videoEl, options)
            const results = await faceDetectionTask
            
            const detectionsForSize = results.map(det => det.forSize(videoEl.width, videoEl.height))
            
            const canvas = this.canvas.current
            canvas.width = videoEl.width
            canvas.height = videoEl.height

            if(videoEl.paused || videoEl.ended){
                console.log('Video stopped')
                return
            } else {
                faceapi.drawDetection(canvas, detectionsForSize, { withBoxes: true })
                setTimeout(console.log(detectionsForSize))
                setTimeout(() => track(videoEl))
            }

        }
        
        track(document.getElementById(this.props.video))

    }

    async loadModels() {
        await faceapi.loadTinyFaceDetectorModel('/models')
        await faceapi.loadFaceLandmarkTinyModel('/models')
        // await faceapi.loadMtcnnModel('/models')
        // await faceapi.loadFaceLandmarkModel('/models')
        // await faceapi.loadFaceRecognitionModel('/models')
    }

    render() {
        return (
            <canvas ref={this.canvas} id="overlay"></canvas>
        )
    }
}

export default Tracking