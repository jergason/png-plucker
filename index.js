(function () {
  "use strict";
  var fs = require('fs')
    , PNG_HEADER_BUF
    , PNG_HEADER_STRING
    , PngStreamer
    ;

  PNG_HEADER_BUF = new Buffer([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  PNG_HEADER_STRING = PNG_HEADER_BUF.toString('binary');



    function pngPlucker(stream, cb) {
      var acc = ''
        ;
      stream.on('data', function(data) {
        acc += data.toString('binary');
        acc = searchForPng(acc, cb);
      });
    }

    function searchForPng(dataString, cb) {
      var files
        , loc
        , pngFile
        ;

      loc = dataString.indexOf(PNG_HEADER_STRING, 1);
      if (loc === -1) {
        return dataString;
      }
      files = dataString.split(PNG_HEADER_STRING);
      pngFile = new Buffer(PNG_HEADER_STRING + files[0] + files[1], 'binary');
      this.newestImage = pngFile;
      cb(null, pngFile);
      return this.searchForPng(PNG_HEADER_STRING + files.slice(2).join(PNG_HEADER_STRING), cb);
    };

  module.exports = pngPlucker;
}());
