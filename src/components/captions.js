import React, { Component } from 'react'
import './captions.css'
// import tracking from "./tracking.js"
const data = require('../data/b99.json').results

class Captions extends Component {

    //add state to word
    constructor(props) {
        super(props);
        this.state = { word: '' };
    }

    componentDidMount(){
        //start a function that 
        const words = data.transcripts[0].transcript.split(' ')
        const segments = data.speaker_labels.segments
        let scriptMetaData = []
        // wordindex == scriptMetaData index to match them up
        // let wordIndex = 0
        let time

        // takes nested objects in aws json and returns combined object with start time, end time, and speaker label.
        const populatesScriptMetaFromData = segments => {
            segments.forEach(segment => {
                segment.items.forEach(item => {
                    scriptMetaData.push(item)
                })
            })
        }
                
        const scriptStart = data.speaker_labels.segments[0]
        const convertToMs = 1000

        const wordSpeed = (time) => {
            return new Promise((resolve) => {
                setTimeout(resolve, time)
            })
        }


        const start = (time) =>{
            time = scriptStart.start_time * convertToMs
            return new Promise((resolve) => {
                setTimeout(resolve, time)
            })
        }

        const pause = (time) => {
            return new Promise((resolve) => {
                setTimeout(resolve, time)
            })
        }

        let firstWord = true
        let lastWord = false
        const speak = async () => {           
            for (let i = 0; i < words.length; i++) {

                let endTime = (scriptMetaData[i].end_time) * convertToMs
                let word = words[i]
                let startTime = (scriptMetaData[i].start_time) * convertToMs
                let nextSpeakerStartTime = (i + 1 === words.length) ? lastWord=true : (scriptMetaData[i + 1].start_time) * convertToMs
                
                if (firstWord === true) {
                    await start()
                    setStateWord(word)
                    firstWord = false
                } 
                else if (lastWord === true) {
                    time = endTime - startTime
                    setStateWord(word)
                    await wordSpeed(time)
                }
                else if (endTime < nextSpeakerStartTime) {
                    time = nextSpeakerStartTime - endTime
                    setStateWord(word)
                    await pause(time)
                } 
                else {
                    time = endTime - startTime
                    await wordSpeed(time)
                    setStateWord(word)
                    await pause(time)
                }               
            }
        }
        
        const setStateWord = (word) => { this.setState({ word: word })}
        
        populatesScriptMetaFromData(segments)
        speak()
    }

    render() {
    // captions created using AWS transcribe. Could I incorporate natively
        return (
            <div className = "captions-container" >
                <div className="word">{this.state.word}</div>
            </div>
        )
    }   
}

export default Captions