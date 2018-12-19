import React, { Component } from 'react';
import * as faceapi from 'face-api.js'
import './video.css'

const testVideo = 'assets/b99.mp4'

export default class Tracking extends Component {

    constructor(props) {
        super(props)
        this.canvas = React.createRef()
        this.video = React.createRef()
    }

    async componentDidMount() {
        await this.loadModels()
        console.log('loadModels done')

        const onPlay = async (videoEl) => {
            const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 608 })
            const faceDetectionTask = faceapi.detectAllFaces(videoEl, options)
            const results = await faceDetectionTask
            console.log('face detection task done')

            const detectionsForSize = results.map(det => det.forSize(videoEl.width, videoEl.height))
            const canvas = this.canvas.current
            canvas.width = videoEl.width
            canvas.height = videoEl.height

            faceapi.drawDetection(canvas, detectionsForSize, { withBoxes: true })

            setTimeout(() => onPlay(videoEl))
        }

        onPlay(this.video.current)

    }

    async loadModels() {
        await faceapi.loadTinyFaceDetectorModel('/models')
        await faceapi.loadMtcnnModel('/models')
        await faceapi.loadFaceLandmarkModel('/models')
        await faceapi.loadFaceLandmarkTinyModel('/models')
        await faceapi.loadFaceRecognitionModel('/models')
    }

    render() {
        return (
            <div className="video">
                <video id="inputVideo" ref={this.video} src={testVideo} width={720} height={405} autoPlay muted loop controls>
                </video>
                <canvas ref={this.canvas} id="overlay"></canvas>
            </div>
        )
    }
}