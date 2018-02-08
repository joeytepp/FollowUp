var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient
var lyr = require('lyrics-fetcher')
var url = "mongodb://localhost:27017"
/* GET home page. */



MongoClient.connect(url, function(err, db){
  if(err) throw err
  var dbo = db.db('FollowUp')
  dbo.collection('places').find({}).toArray(function(err, res){
    if(err) throw err
    var array = []
    for(var i in res){
      array.push(res[i])
    }
    initialConnect(array)

    router.post('/click', function(req,res){
      var test = req.body.test
      lyr.fetch('Death Grips', test, function(err, lyrics){
        if(err) throw error
        res.send(lyrics)
      })
    })

    router.get('/error', function(req, result, next){
      res.send('Moving...')
      console.log('redirecting')
      res.redirect('/users')
    })
  })
})

module.exports = router;

var initialConnect = function(array){
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'FollowUp', places: array})
  })
}
