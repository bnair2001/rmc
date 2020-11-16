var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:Mu75M8Bt7ftr0MZc@cluster0.cniyt.mongodb.net/<dbname>?retryWrites=true&w=majority";

export default (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err)  res.json({ message: 'DB-error', err: True});
    var dbo = db.db("rmc");
    var query = { uni_id:  req.query.uid, course_id: req.query.cid};
    dbo.collection("courses").find(query).toArray(function(err, result) {
      if (err) res.json({ message: 'DB-error-2', err: True});
      res.statusCode = 200
      res.json(result);
      db.close();
    });
  });

}
