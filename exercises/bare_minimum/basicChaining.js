/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise(function(resolve, reject) {
	fs.readFile(readFilePath, 'utf8', function(err, text) {
	  if (err) {
		reject(err);
	  } else {
	    var username = text.split('\n')[0];
		resolve(username);
	  }
	})
  })
  .then(function(username) {
  	return new Promise(function(resolve, reject) {
	  var options = {
	    url: 'https://api.github.com/users/' + username,
	    headers: { 'User-Agent': 'request' },
	    json: true  // will JSON.parse(body) for us
	  };
	  request.get(options, function(err, res, body) {
	    if (err) {
	      reject(err);
	    } else {
	      resolve(body)
	    }
	  });
  	})
  })
  .catch(function(err) {
  	console.log('error: ', err);
  })
  .then(function(body) {
  	body = JSON.stringify(body);
  	return new Promise(function(resolve, reject) { // needed to wrap in a promise to prevent test from calling too soon
  	  fs.writeFile(writeFilePath, body, (err) => {
  	    if (err) { 
  	  	  reject(err); 
  	    } else {
  	  	  resolve();
  	    }
  	  })
  	});
  })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
