import * as faceapi from 'face-api.js'
import './tracking.css'

export default function tracking(props){
    
    const loadModels = async () => {
        await faceapi.loadTinyFaceDetectorModel('/models')
        await faceapi.loadFaceLandmarkTinyModel('/models')
    }

    
    const track = async (videoEl) => {
        await loadModels()

        const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 608 })
        const faceDetectionTask = faceapi.detectAllFaces(videoEl, options)
        const results = await faceDetectionTask

        const detectionsForSize = results.map(det => det.forSize(videoEl.width, videoEl.height))

        if (videoEl.paused || videoEl.ended) {
            console.log('Video stopped')
            return
        } else {
            console.log(detectionsForSize)
            setTimeout(() => track(videoEl))
            // pass coordinates from here to parent (video) and then from parent to sibling (captions)
        }

    }

    track(document.getElementById(props))
}