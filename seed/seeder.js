var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"

MongoClient.connect(url, function(err, db){
  if (err) throw err
  var dbo = db.db("FollowUp")
  var myObj = []

  for(var i = 0; i<20; i++){
    myObj.push({name: "Number " + i, number: i})
  }

  dbo.collection("collection").insertMany(myObj, function(err, res){
    if(err) throw err
    console.log(res.insertedCount+" document inserted")
    db.close()
  })
})
