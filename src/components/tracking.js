import * as faceapi from 'face-api.js'
import './tracking.css'
import position from './position'

export default function tracking(props){
    
    const loadModels = async () => {
        await faceapi.loadTinyFaceDetectorModel('/models')
        await faceapi.loadFaceLandmarkTinyModel('/models')
    }

    const track = async (videoEl) => {
        await loadModels()

        const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 608 })
        const faceDetectionTask = faceapi.detectAllFaces(videoEl, options)
        const detectFace = await faceDetectionTask
        const detectionsForSize = detectFace.map(det => det.forSize(videoEl.width, videoEl.height))
        
        let faceResults = {}

        //this needs to await video playing
        if (videoEl.paused || videoEl.ended) {    
            console.log('video not playing')
            return
        } else {            
            setTimeout(() => track(videoEl))

            detectionsForSize.forEach((detection, i) => {
                return faceResults = {
                    x: detection._box._x,
                    y: detection._box._y,
                    faceHeight: detection._box._height,
                    faceWidth: detection._box._width,
                    numOfFacesDetected: i + 1
                }
            })
            position(faceResults)
        }       
    }

    track(document.getElementById(props))
}
