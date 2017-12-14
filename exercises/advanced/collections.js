/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  Promise.all(filePaths)
  .then(function(filePaths) {
  	return new Promise(function(resolve, reject) { // put lines 18 - 30 in here
  	
  	})
  	var newFile = []
  	filePaths.forEach(function(filePath) {
	  fs.readFile(filePath, 'utf8', function(err, text) {
	    if (err) {
		  reject(err);
	    } else {
	      var firstLine = text.split('\n')[0];
  	      console.log('FIRSTLINE: ', firstLine)
	      newFile.push(firstLine);
	    }
	  })
  	});
  	console.log('newFile: ', newFile); // printing before code above runs
  })
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};