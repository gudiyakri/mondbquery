const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'userdb'
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=> {
 if (error) {
 return console.log('Unable to connect to database!')
 }
 const db = client.db(database)

 // reference for collection from mondodb database
 db.collection('usercol').insertOne /* using insertOne() method to insert single documents */({
    Firstname:'Gudiya1',
    Lastname:'kum',
    age:20
 });
// reference for collection from mondodb database
db.collection('usercol').insertMany/*using insertMany() method to insert multiple documents at once*/([
    {
        Firstname:'Somiya',
        Lastname:'kumari',
        age:21
    },
    {
        Firstname:'ABC',
        Lastname:'tryr',
        age:21  
    }
],(error,result)=>{
    if(error){
        return console.log('unable to insert')
    }
    //console.log(result.ops)
});
//using find method to searching for documents in the usercol collection.
db.collection('usercol').find({Firstname:'Gudiya'}).toArray((error, usercol) =>{
    console.log(usercol)
});

/*
//using findOne to finde a single document by its ID.
db.collection('usercol').findOne({ _id: new
    ObjectID("621e2d3e32c07b4a50eb9e2c") }, (error, usercol) => {
     console.log(usercol)
    })
*/

const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
    resolve([7, 4, 1])
    // reject('Things went wrong!')
    }, 2000)
   })
   doWorkPromise.then((result) => {
    console.log('Success!', result)
   }).catch((error) => {
    console.log('Error!', error)
   });

//update only single document
var query = { Firstname: "ABC" };
  var newvalues = { $set: { Firstname: "GPGS", Lastname: "kumari" } };
  db.collection("usercol").updateOne(query, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
  });
//update only multiple document
  var myquery = { Firstname: /^Gudiya1/ };
  var newvalues = {$set: {Firstname: "Gudiya"} };
  db.collection("usercol").updateMany(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log( ''+ " document(Gudiya1) updated");
  });
  

  //Delete only one document.
  db.collection('usercol').deleteOne({
    Firstname: "GPGS"
   }).then((result) => {
    console.log(result)
   }).catch((error) => {
    console.log(error)
   })
  /*db.collection('usercol').updateMany({
    Firstname: ABC
    }, {
    $set: {
    Firstname: GPGS
    }
    }).then((result) => {
    console.log(result.modifiedCount)
    }).catch((error) => {
    console.log(error)
    })*/

})







/*
//This one also correct



const {MongoClient} = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const database='userdb'
const client= new MongoClient(url);
// create function for connection
async function getData()
{
    let result= await client.connect();
   let db= result.db(database);
   let collection = db.collection('usercol');
  // console.log(collection.find().toArray());
  let response = await collection.find({}).toArray();
  console.log(response);
}
//call function
getData();


*/