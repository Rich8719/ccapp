import React, {Component} from 'react'
import './video.css'

class Video extends Component {
    
    // constructor(props) {
    //     super(props)
    //     this.handleOnLoad = this.handleOnLoad.bind(this)
    // }
    
    // handleOnLoad () {
        // const video = this.video.current
    // }

    render() {
        return (
            <video src="assets/b99.mp4" onLoadStart={this.handleOnLoad} id="inputVideo" width={720} height={405} autoPlay muted></video>
        )
    }
}

export default Video