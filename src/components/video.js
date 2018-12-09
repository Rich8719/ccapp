import React, {Component} from 'react'
import './video.css'

class Video extends Component {
    render() {
        return (
            <video controls>
                <source src="assets/simpsons.mp4" type="video/mp4"></source>
            </video>
        )
    }
}

export default Video