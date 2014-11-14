var express = require('express');
var elasticsearch = require('elasticsearch');

// Connect to localhost:9200 and use the default settings
var client = new elasticsearch.Client();

// Connect the client to two nodes, requests will be
// load-balanced between them using round-robin
var client = elasticsearch.Client({
  hosts: [
    process.env.ES_HOST + ':9200'
  ]
});

var app = express();

app.get('/', function(req, res){
  
  if (req.query.q != null) {
       
    var m_res = "";
    
    client.search({q:req.query.q}).then(function (body) {
    // console.log(body.hits.hits);
    m_res += "<h1> HELLO Reonomy </h1>";
    body.hits.hits.forEach(function (res) {
      m_res += res._source.text_entry + "<br>";
    });
    res.send(m_res);
    },function (error) { console.trace(error.message);}); 
    
  } else {
    res.send('This node.js server is connected to an ES backend with some seed data. Please append a query parameter to the URL to search the ES database: ?q=<query>.');
  }
});

app.listen(80);
