# png-plucker

A little module for parsing PNGs from streams. Useful with ffmpeg using
image2pipe, for example.

`png-plucker` exports a single function that takes a stream and a callback that
is called whenever a PNG is found in the stream. It just looks for the PNG file
header, and assumes everything from a header to the next header is a single
PNG, so if you have other data mixed in with PNGs you will probably get
weirdness.

## Installation

```bash
npm install png-plucker
```

## Useage

```JavaScript
var pngPlucker = require('png-plucker'),
spawn = require('child-process').spawn,
fs = require('fs'),
counter = 0,
ffmpeg;

ffmpeg = spawn('ffmpeg', ['-i', 'some_movie.mpeg', '-y', '-f', 'image2pipe', '-'])
pngsPlucker(ffmpeg.stdout, function (error, image) {
  counter++
  fs.writeFile('file'+counter+'.png', image);
});
```

## API

### pngPlucker(stream, cb)
* `stream` - a stream of PNGs
* `cb(err, image)` - a callback function to consume the PNGs plucked out of the
  stream. `image` is a buffer.
