(function () {
  "use strict";

  var pngPlucker = require('../')
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
      assert.equal(file.toString('binary'), data, "Unequal stuff in " + counter);
      if (counter === 2) {
        done();
      }
    };
  };

  describe('png-plucker', function() {
    it('correctly splits out several png files from a stream', function(done) {
      var testFileStream
        , timesCalled = 0
        ;

      timesCalled = 0;
      testFileStream = spawn('cat', ['test/testPngWith3Images.png']);
      pngPlucker(testFileStream.stdout, function(err, data) {
        var fileName;
        if (err) {
          throw err;
        }
        fileName = "test/" + individualImageFiles[timesCalled++];
        fs.readFile(fileName, 'binary', compareFilesWithCounter(timesCalled, fileName, data, done));
      });
    });
  });
}());
