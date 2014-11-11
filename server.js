var express = require('express');
var elasticsearch = require('elasticsearch');

// Connect to localhost:9200 and use the default settings
var client = new elasticsearch.Client();

// Connect the client to two nodes, requests will be
// load-balanced between them using round-robin
var client = elasticsearch.Client({
  hosts: [
    'elasticsearchseeddata.runnabledemo.runnable.io:9200'
  ]
});

var app = express();

app.get('/', function(req, res){
  
  if (req.query.q.length > 0) {
    client.search({
      q: req.query.q
    }).then(function (body) {
      var hits = body.hits.hits;
      res.send("Here are your search results from ElasticSearch:", hits);
    }, function (error) {
      console.trace(error.message);
    });
  } else {
    res.send('Hello World!');
  }
});

app.listen(80);
