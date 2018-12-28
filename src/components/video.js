import React, {Component} from 'react'
import './video.css'
import Captions from './captions'
import tracking from './tracking'

const videoEl = 'inputVideo'

class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {videoStatus: 'loading'}
    }
    
    async handleOnLoad () {
        await this.props.onVideoLoad('loaded')
        tracking(videoEl)
    }

    

    handleError() {
        this.setState({ videoStatus: 'failed'})
    }
    
    render() {
        return (
        <div>
            <video src="assets/b99.mp4" onLoadStart={this.handleOnLoad.bind(this)} onError={this.handleError.bind(this)} id={videoEl} width={720} height={405} autoPlay muted controls></video>
            <Captions/>
        </div>
        )
    }
}

export default Video