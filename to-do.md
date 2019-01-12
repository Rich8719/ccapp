# To Do

## Captions
- Create on start, on pause functionality
<!-- -- Fix current time in video.js so that pause time does not increase when paused -->
--loop through scriptStart to get index number of element that is closest to the current time, then pass that value to speak and start speak loop from that item.


## Tracker
- Match up faces to voices (number of speakers)
- needs to return speaker id
-  Rounded numbers in dections for size should be variables based on video size not fixed numbers
- onstart and on pause
- I think the conditional in track may be continuing to run constantly 

## Video
- Consider implementing React Player for videos https://www.npmjs.com/package/react-player
- Video sometimes starts after tracking.js causing tracking to log the video as stopped and not run

## Parse
- Clean up loops
- Adjust minimum word time. Currently at 120ms. If this is the max people can read easily, then will need to adjust speaking time during pauses to make up for the extra time to stop speakers going out of sync.