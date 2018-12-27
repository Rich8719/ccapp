import React, { Component } from 'react'
import './captions.css'
import parseTranscript from "./parseAwsTranscript";

class Captions extends Component { 

    constructor(props) {
        super(props)
        this.state = { word: '' }
    }
    
    componentDidMount(){
        const script = parseTranscript()

        const speak = () => {
            script.forEach( async (item) => {
                await wait(item.start)               
                if (item.pause > 250) { //if pause between words greater than 250ms remove word   
                    console.log(`${item.word} | Word Speed: ${item.wordSpeed}`)
                    
                    await setStateWord(item.word, item.wordSpeed)
                    setStateWord('')                 
                } else {
                    console.log(`${item.word} | Word Speed: ${item.wordSpeed}`)
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
            <div className = "captions-container" >
                <div className="word">{this.state.word}</div>
            </div>
        )
    }   
}

export default Captions