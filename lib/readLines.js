'use strict';
var fsp = require('fs').promises;
var readline = require('readline');

module.exports = readLines;

/**
 * Read a file line-by-line.
 *
 * @param {String} path Path to the file.
 * @param {Function} callback Function to call when reading each line.
 * @returns {Promise} A promise when the reader is finished.
 *
 * @private
 */
function readLines(path, callback) {
    return fsp.open(path)
        .then(function(fd) {
            return new Promise(function(resolve, reject) {
                var stream = fd.createReadStream();
                stream.on('error', reject);
                stream.on('end', resolve);
        
                var lineReader = readline.createInterface({
                    input : stream
                });
                lineReader.on('line', callback);
                lineReader.on('error', reject);
            });
        });
}
