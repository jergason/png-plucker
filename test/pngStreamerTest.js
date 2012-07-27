(function () {
  "use strict";

  var PngStreamer = require('../')
    , assert = require('assert')
    , fs = require('fs')
    , spawn = require('child_process').spawn
    , individualImageFiles = ['1.png', '2.png', '3.png']
    ;

  function compareFilesWithCounter(counter, fileName, file, done) {
    return function(err, data) {
      if (err) {
        throw err;
      }
      assert.equal(file.toString('hex'), data, "Unequal stuff in " + counter);
      if (counter === 2) {
        done();
      }
    };
  };

  describe('pngStreamer', function() {
    it('correctly splits out several png files from a stream', function(done) {
      var pngStreamer
        , testFileStream
        , timesCalled = 0
        ;

      timesCalled = 0;
      testFileStream = spawn('cat', ['test/testPngWith3Images.png']);
      pngStreamer = new PngStreamer(testFileStream, function(err, data) {
        var fileName;
        if (err) {
          throw err;
        }
        fileName = "test/" + individualImageFiles[timesCalled++];
        fs.readFile(fileName, 'hex', compareFilesWithCounter(timesCalled, fileName, data, done));
      });
    });
  });
}());
