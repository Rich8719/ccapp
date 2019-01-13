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

	scriptStart = (currentTime) => {
		//This returns the index for the element closest to last word spoken
		//This wont work, because if someone rewinds it won't get the new word. Need to evalute which index is closest to current time
		// https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
		console.log(currentTime)
		script.forEach((element, index) => {
			if(this.state.word === element.word){
				console.log(index)
				return script = script.slice(index)
			}
		})
	}

	speak = async (currentTime) => {
		await this.scriptStart(currentTime)
		console.log(script)

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
		if (this.props.videoPlayStatus !== prevProps.videoPlayStatus && this.props.videoPlayStatus === 'play') {
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