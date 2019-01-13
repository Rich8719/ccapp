const data = require('../data/b99.json').results
const convertToMs = 1000
let words

export default function parseTranscript() {
    let scriptMeta = []
    
    const populateWords = data => {
        data.transcripts.forEach(transcript => {
            return words = transcript.transcript.split(' ')
        })
    }
    
    const segments = data.speaker_labels.segments
    
    const populateScriptMeta = segments => {
        segments.forEach(segment => {
            segment.items.forEach(item => {
                scriptMeta.push(item)
            })
        })
    }
    
    populateScriptMeta(segments)
    populateWords(data)
    
    let script = []

    for (let i = 0; i < words.length; i++) {
        let wordSpeed = Math.ceil((scriptMeta[i].end_time - scriptMeta[i].start_time) * convertToMs)      
        
        script.push({
            speaker: scriptMeta[i].speaker_label,
            nextSpeaker: (i + 1 === scriptMeta.length) ? null : scriptMeta[i + 1].speaker_label,
            word: words[i],
            start: scriptMeta[i].start_time * convertToMs,
            end: scriptMeta[i].end_time * convertToMs,
            //set minimum word speed to 120ms
            wordSpeed: (wordSpeed < 120) ? 120 : wordSpeed,
            pause: (i + 1 === words.length) ? null : Math.ceil((scriptMeta[i + 1].start_time - scriptMeta[i].end_time) * convertToMs)
        })         
    }

    return script
}