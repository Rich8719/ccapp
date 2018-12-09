const data = require('../../public/assets/aws-captions.json').results
const words = data.transcripts[0].transcript.split(' ')
const segments = data.speaker_labels.segments
let scriptMetaData = []
// wordindex == scriptMetaData index to match them up
let wordIndex = 0

//takes nested objects in aws json and returns combined object with start time, end time, and speaker label.
for (let i = 0; i < segments.length; i++) {
    let current = segments[i].items
    for (let j = 0; j < current.length; j++) {
        scriptMetaData.push(current[j])
    }
}

const speed = (i) =>{
    let startTime = scriptMetaData[i].start_time
    let endTime = scriptMetaData[i].end_time
    let nextSpeakerStartTime = scriptMetaData[i++].start_time
    
    if (endTime < nextSpeakerStartTime) { 
        pause = Math.floor((nextSpeakerStartTime - endTime) *1000)
        return new Promise((resolve) => {
            setTimeout(resolve, pause)
        })
    } else {
        speak = Math.floor((endTime - startTime) * 1000)
        return new Promise((resolve) => {
            setTimeout(resolve, speak)
        })
    }
}

async function speak () {
    for (let i = 0; i < words.length; i++) {
        wordIndex = i
        if (speak) {
            await speed(wordIndex)
            console.log(words[i])
        } else if (pause) {
            await speed(wordIndex)
            console.log('pause')
        }
    }
}

speak()