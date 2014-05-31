# Web Dream

A chrome extension that displays a colourful image to represent your last week of web history

## Why?

Why not?

# Is it interactive?

No sorry, this was just a quick and dirty way to visualise browsing data.

## What is the image showing me?

- Each circle is a host name eg. google.com.
- The size of the circle represents the number of times it appears in your history in the last week, relative to others.
- The x position repesents the *average* day that site was accessed, represented from monday to sunday
- The y position represents the *average* hour of the day the host is accessed, from 0000 to 2359

## Using grunt
`npm install`

### Running locally
`grunt` or `grunt default`

unpackaged files should be added to chrome (bin/)

### Packaging for distrubution

`grunt dist`
