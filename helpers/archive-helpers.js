var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(func){
  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    func(data.split('\n'));
  })
};

exports.isUrlInList = function(url , func){
  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    var array = data.split('\n');
    func(_.contains(array, url))
  })
};

exports.addUrlToList = function(url, func){
  console.log("fs.append(and some magic happens!)")
  fs.appendFile(exports.paths.list, url + '\n', 'utf8', function(err){
    func();
  })
};

exports.isUrlArchived = function(url, func){
  fs.readFile(exports.paths.archivedSites + '/' + url, function(err, data){
    if(data === undefined){
      // console.log('This is the falsy data :(', data)
      func(false);
    }else {
      // console.log('This is the truthy data :)', data.toString())
      func(true);
    }
  })
};

exports.downloadUrls = function(array){
    fs.readFile(exports.paths.list, 'utf8', function(err, data){
    var array = data.split('\n');
    console.log('This is the array', array);
  })
};
