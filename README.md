# pngsFromStream

A little module for parsing PNGs from streams. Useful with ffmpeg using
image2pipe, for example.

## Installation

```bash
npm install pngsFromStream
```

## Useage

```JavaScript
var pngsFromStream = require('pngsFromStream'),
spawn = require('child-process').spawn,
fs = require('fs'),
counter = 0,
ffmpeg;

ffmpeg = spawn('ffmpeg', ['-i', 'some_movie.mpeg', '-y', '-f', 'image2pipe', '-'])
pngsFromStream(ffmpeg.stdout, function (error, image) {
  counter++
  fs.writeFile('file'+counter+'.png', image);
});
```

## API

