# To Do

## Captions
- Create on start, on pause functionality

## Tracker
- Position text to coordinates
- Match up faces to voices (number of speakers)
- needs to return x and y coordinates to video.js/captions.js and speaker id if possible

## Video
- Consider implementing React Player for videos https://www.npmjs.com/package/react-player
- Pass video id to tracking.js

## Parse
- Clean up loops
- Adjust minimum word time. Currently at 120ms. If this is the max people can read easily, then will need to adjust speaking time during pauses to make up for the extra time to stop speakers going out of sync.