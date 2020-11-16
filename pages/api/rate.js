var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:Mu75M8Bt7ftr0MZc@cluster0.cniyt.mongodb.net/<dbname>?retryWrites=true&w=majority";

export default function handler(req, res) {
    if (req.method === 'POST') {
        MongoClient.connect(url, function(err, db) {
            if (err) res.json({ message: 'DB-error', err: True});
            var dbo = db.db("rmc");
            dbo.collection("reviews").insertOne(req.body, function(err, docID) {
              if (err) res.json({ message: 'DB-error-2', err: True});
              console.log("1 document inserted");
              
              db.close();
            });
          });
    } else {
        res.json({ message: 'Send a post request!!', err: True});
    }
  }