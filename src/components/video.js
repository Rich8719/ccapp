import React, {Component} from 'react'
import './video.css'

class Video extends Component {
    render() {
        return (
            <div className = 'video-wrapper'>
                <video controls>
                    <source src="assets/simpsons.mp4" type="video/mp4"></source>
                </video>
                <div className="captions-container">
                </div>
            </div>
        )
    }
}

export default Video