import React, {Component} from 'react'
import './video.css'
// import tracking from './tracking'
// import { OptimizerConstructors } from '@tensorflow/tfjs-core/dist/optimizers/optimizer_constructors';

class Video extends Component {
    
    constructor(props) {
        super(props)
        this.inputVideo = React.createRef()

        this.handleOnLoad = this.handleOnLoad.bind(this)
    }
    
    handleOnLoad () {
        const video = this.inputVideo.current
        console.log(video)
        // tracking(video)
    }

    render() {
        return (
            <div className="video">
                <video src="assets/b99.mp4" 
                onLoadStart={this.handleOnLoad}
                id="inputVideo" ref={this.inputVideo} autoPlay mute></video>
            </div>
        )
    }
}

export default Video