var url = "mongodb://localhost:27017"
var async = require("async")
var geocoder = require('google-geocoder')
var MongoClient = require('mongodb').MongoClient
    // Importing the necessary packages
var geo = geocoder({
  key: 'AIzaSyD0JAwC4x5AgtWSD6z3FKlg3ppbzSm9Asw'
}); // Setting up the geocoder

var placeNames = ["Toronto", "Birmingham", "London", "Geneva", "Melbourne"]
var places = []

for(var i in placeNames){
  places.push({
    name: placeNames[i],
    lat: 0,
    lng: 0
  })
}
console.log(places);

var a = 0
async.forEach(places, function(place, callback){
  geo.find(place.name, function(err, res){
    if(err) throw err
    place.lat = res[0].location.lat
    place.lng = res[0].location.lng
    a++
    if(a == places.length){
      MongoClient.connect(url, function(err, db){
        if(err) throw err
        var dbo = db.db("FollowUp")
        dbo.collection("places").insertMany(places, function(err, res){
          if(err) throw err
          console.log("inserted ", res.insertedCount)
          db.close()
        })
      })
    }
  })
})



var getLng = function(name){
  console.log(name)
}
//asynch.forEach()

/*var MongoClient = require('mongodb').MongoClient
MongoClient.connect(url, function(err, db){
  if (err) throw err
  var counter = 0
  var myObj = []  //initializing some variables

  var dbo = db.db("FollowUp")
  dbo.createCollection("collection", {}, function(err, res){
    if(err) throw err
    console.log("Created collection")
  })

  for(var i = 0; i<20; i++){
    myObj.push({name: "Number " + i, number: i})
  }
  for(var i = 0; i<10; i++){
    dbo.collection("collection").insertMany(myObj, function(err, res){
      if(err) throw err
      console.log(res.insertedCount+" document inserted")
      counter++
    })

    dbo.collection("collection").remove({}, function(err, numberRemoved){
      console.log("collection empty")
      db.close()
      console.log("goodbye")
    })

  }

  console.log("ok")

})
*/
