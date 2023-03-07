# Client
1. ~~Break out CSS into separate files.~~
2. ~~Break out the layout into smarter components that~
3. ~~Clean up API calls~~
4. ~~Migrate to React-Redux and Persist Store~~
5. ~~Exchange the auth token (code=?) for an access token https://developer.spotify.com/documentation/general/guides/authorization/code-flow/~~



# Server
1. ~~Clean up API calls~~
2. ~~Move to organized structure and refactor code organization~~


# Updated March 7th, 2023
1. dashboard.jsx - accessToken not necessary
2. accessToken validation should occur in app.js, if it doesn't exist, don't run the app and redirect.
3. Stop audio from changing "Play"/"Pause" state on page load // If something is playing, this causes the music to stop.
4. handleClick() function should be global
