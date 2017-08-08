// Packages and requirements
const express = require('express');
var morgan = require("morgan");
var axios = require("axios");
const app = express();
var movieCache = {};


app.use(morgan("dev"));
app.get("/", function(req, res){
// If statement checks for the movie in the movieCache if not found it will query the OMDB site else it will return data from movieCache    
  if (movieCache[req.url] === undefined){
    if(req.url === "/"){
      return res.status(200).send("Blank Url!");      
    }
    axios.get("http://www.omdbapi.com" + req.url + "&apikey=8730e0e")
    .then(function (response) {
      movieCache[req.url] = response.data;
      res.status(200).json(movieCache[req.url]);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json(error.message);
    })
  }
  else {
    res.status(200).json(movieCache[req.url]);
  }
});

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;
