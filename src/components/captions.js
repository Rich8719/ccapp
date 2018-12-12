// captions created using AWS transcribe. Could I incorporate natively?
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
    let convertToMs = 1000
    let startTime = (scriptMetaData[i].start_time) * convertToMs
    let endTime = (scriptMetaData[i].end_time) * convertToMs
    let nextSpeakerStartTime = (scriptMetaData[(i + 1)].start_time) * convertToMs
    
    // timing for speech function pause and speak
    if (endTime < nextSpeakerStartTime) { 
        let time = nextSpeakerStartTime - endTime
        return new Promise((resolve) => {
            console.log('pauseTime', time)
            setTimeout(resolve, time)
        })
    } else {
        time = endTime - startTime
        return new Promise((resolve) => {
            setTimeout(resolve, time)
        })
    }
}

async function speak () {
    for (let i = 0; i < words.length; i++) {
        wordIndex = i
        await speed(wordIndex)
        console.log(words[i])
    }
}

speak()