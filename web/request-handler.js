var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers.js');
var fs = require('fs');

// require more modules/folders here!
exports.handleRequest = function (req, res) {
  var statusCode = 200

  if(req.method === 'GET'){
    if(req.url === '/'){
      fs.readFile(archive.paths.siteAssets + '/index.html','utf8', function(err, data){
      res.end(data)
      })
    }else{
      var url = req.url; 
      fs.readFile(archive.paths.archivedSites + url, 'utf8', function(err, data){
        if(data){
          res.end(data)
        }else{
          res.writeHead(404);
          res.end();
        }
      })
    }
  }

  if(req.method === 'POST'){
    var body = [];
    req.on('data', function(chunk){
      body.push(chunk)
      });  
    req.on('end', function(){
      //console.log('BODY**********', body)
      object = JSON.parse(body.toString());
      //console.log('OBJECT********',object)
      url = object.url;
      console.log('This is the body*******', url)
      fs.appendFile(archive.paths.list, url + '\n', 'utf8', function(err){
      console.log('hope this works', archive.paths.list)
      res.writeHead(302);
      res.end();

    })
  })


  }
};
