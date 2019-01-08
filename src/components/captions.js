import React, { Component } from 'react'
import './captions.css'
import parseTranscript from './parseAwsTranscript'

let script = parseTranscript()

class Captions extends Component { 
	
	constructor(props) {
		super(props)
		this.state = { word: ''}
	}

	// Pass to traking.js
	// const nextSpeaker = (item.speaker === item.nextSpeaker) ? false : true 
	// this.props.isNextSpeaker(nextSpeaker)
	
	wait = (time) => {
		return new Promise(resolve => {
			setTimeout(resolve, time)
		})
	}

	setStateWord = async (word, wordSpeed) => {
		this.setState({ word: word })
		await this.wait(wordSpeed)
	}

	// scriptStart = (currentTime) => {
	// 	console.log(currentTime)
	// 	script.forEach(element => {
			
	// 	});
	// }
	
	speak = async () => {
		// await this.scriptStart(currentTime)
		// script = script.slice(scriptStart)

		script.forEach(async (item) => {
			await this.wait(item.start)
			if (this.props.videoPlayStatus === 'pause' || this.props.videoPlayStatus === 'stopped') {
				return
			}
			else if(item.pause > 250) { //if pause between words greater than 250ms remove word   
				await this.setStateWord(item.word, item.wordSpeed)
				this.setStateWord('')
			} else {
				this.setStateWord(item.word, item.wordSpeed)
				// console.log(this.props.videoPlayStatus)
			}
		})
	}

	componentDidUpdate(prevProps){
		if (this.props.videoPlayStatus !== prevProps.videoPlayStatus) {
			this.speak(this.props.currentTime)
		} 
	}

	render() {
		return (
			<div className = "captions-container" style={this.props.position}>
				<div className="word">{this.state.word}</div>
			</div>
		)
	}   
}

export default Captions