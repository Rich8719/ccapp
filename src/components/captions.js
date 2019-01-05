import React, { Component } from 'react'
import './captions.css'
import parseTranscript from './parseAwsTranscript'

class Captions extends Component { 

	constructor(props) {
		super(props)
		this.state = { word: ''}
	}
	
	componentDidMount(){
		const script = parseTranscript()

		// Pass to traking.js
		// const nextSpeaker = (item.speaker === item.nextSpeaker) ? false : true 
		// this.props.isNextSpeaker(nextSpeaker)

		const speak = () => {  
			script.forEach( async (item) => {
				await wait(item.start)  
				
				if (item.pause > 250) { //if pause between words greater than 250ms remove word   
					await setStateWord(item.word, item.wordSpeed)
					setStateWord('')
					
				} else {
					setStateWord(item.word, item.wordSpeed)
				}
			})
		}
		
		const wait = (time) => {
			return new Promise(resolve => {
				setTimeout(resolve, time)
			})
		}
		
		const setStateWord = async (word, wordSpeed) => { 
			this.setState({ word: word })
			await wait(wordSpeed)
		}
		
		speak()
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