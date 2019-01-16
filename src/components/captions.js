import React, { Component } from 'react'
import './captions.css'
import parseTranscript from './parseAwsTranscript'

let script = parseTranscript()
let nextSpeaker = false

class Captions extends Component { 

	
	constructor(props) {
		super(props)
		this.state = { word: ''}
	}
	
	wait = (time) => {
		return new Promise(resolve => {
			setTimeout(resolve, time)
		})
	}
	
	setStateWord = async (word, wordSpeed) => {
		this.setState({ word: word })
		await this.wait(wordSpeed)
	}
	
	scriptStart = () => {
		console.log(script)
		//This returns the index for the element closest to last word spoken
		//This wont work, because if someone rewinds it won't get the new word. Need to evalute which index is closest to current time
		// https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
		// console.log(currentTime)
		script.forEach((element, index) => {
			if(this.state.word === element.word){
				return script = script.slice(index)
			}
		})
	}

	isNextSpeaker = () => {
		script.forEach((item) => {
			nextSpeaker = (item.speaker === item.nextSpeaker) ? false : true
			this.props.isNextSpeaker(nextSpeaker)
		})
	}

	
	speak = async () => {
		await this.scriptStart()
		
		script.forEach(async (item) => {
			const nextSpeaker = (item.speaker === item.nextSpeaker) ? false : true //passed to tracking via video.js function. Determines whether to run tracking or not 
			
			await this.wait(item.start)
			
			if (this.props.videoPlayStatus === 'pause' || this.props.videoPlayStatus === 'stopped') {
				return
			}
			else if(item.pause > 250) { //if pause between words greater than 250ms remove word   
				this.props.isNextSpeaker(nextSpeaker)
				await this.setStateWord(item.word, item.wordSpeed)
				this.setStateWord('')
			} else {
				this.props.isNextSpeaker(nextSpeaker)
				this.setStateWord(item.word, item.wordSpeed)
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