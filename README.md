# Issues
  - undefined db functions
    - resolved by updating code to match latest mongodb(3.6.3) syntax.
    - resources used: [stackoverflow post](https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0/47662979)
    
### For people on version 3.0 of the MongoDB native NodeJS driver:
(This is applicable to people with "mongodb": "^3.0.0-rc0", or a later version in package.json, that want to keep using the latest version.) 

In version 2.x of the MongoDB native NodeJS driver you would get the database object as an argument to the connect callback:
```
MongoClient.connect('mongodb://localhost:27017/mytestingdb', (err, db) => {
  // Database returned
});
```
According to the changelog for 3.0 you now get a client object containing the database object instead:
```
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  // Client returned
  var db = client.db('mytestingdb');
});
```
The close() method has also been moved to the client. The code in the question can therefore be translated to:
```
MongoClient.connect('mongodb://localhost', function (err, client) {
  if (err) throw err;

  var db = client.db('mytestingdb');

  db.collection('customers').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
    console.log(result.name);
    client.close();
  });
}); 
```
