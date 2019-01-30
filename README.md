# Liri-node-app

## Overview
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. It is a command line node app that takes in parameters and gives you back data.

# Liri can provide the user information on:
* Songs via Spotify api
* Movies via Open Movies Database api
* Concerts via Bands in Town api

# Ways to Submit a Query
## Command Lines:
        * spotify-this-song
        * movie-this
        * concert-this
        * do-what-it-says
        
# Search results return
## A search for a song returns: 
* Artist(s)
* The song's name
* The album that the song is from
* A preview link of the song which will launch Spotify

* A song search with no song chosen will default to "The Sign" by Ace of Base

## Examples:
![GitHub Logo](/images/spotify.png)
![GitHub Logo](/images/ace.png)


## A search for a movie returns: 
* Title of the movie
* Year the movie came out
* IMDB Rating of the movie
* Rotten Tomatoes Rating of the movie
* Country where the movie was produced
* Language of the movie
* Plot of the movie
* Actors in the movie

* A movie search with no title will output data for the movie 'Mr. Nobody'

## Examples:
![GitHub Logo](/images/movie.png)
![GitHub Logo](/images/no.png)


## A search for a Bands in Town Artist Events: 
* Name of the venue
* Venue location
* Date of the Event (use moment to format this as "MM/DD/YYYY")

## Example:
![GitHub Logo](/images/event.png)

# A search for "do-what-it-says"
The command of "do-what-it-says" runs the string in "random.txt"

## Example: 
![GitHub Logo](/images/do.png)

Thanks!
