import React, {Component} from 'react'
import './video.css'

class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {videoStatus: 'loading'}
        this.handleOnLoad = this.handleOnLoad.bind(this)
    }
    
    async handleOnLoad () {
        await this.setState({ videoStatus: 'loaded'})
        this.props.onVideoLoad(this.state)
    }

    handleError() {
        this.setState({ videoStatus: 'failed'})
    }

    render() {
        return (
            <video src="assets/b99.mp4" onLoadStart={this.handleOnLoad} onError={this.handleError.bind(this)} id="inputVideo" width={720} height={405} autoPlay muted></video>
        )
    }
}

export default Video