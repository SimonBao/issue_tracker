'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

var _issue = require('./issue.js');

var _issue2 = _interopRequireDefault(_issue);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//express web application framework for serving data

var app = (0, _express2.default)();
//instantiates express;

//body-parser middleware to extract data from request body

app.use(_express2.default.static('static'));
//add middleware layer to handle static routing
//built in express middleware to serve html files relative to request path
app.use(_bodyParser2.default.json());
//add bodyParser middleware layer to extract request body into a json obect

app.get('/api/issues', function (req, res) {
  db.collection('issues').find().toArray().then(function (issues) {
    var metadata = {
      total_count: issues.length
    };
    res.json({
      _metadata: metadata,
      records: issues
    });
  }).catch(function (error) {
    console.log(error);
  });
});
//defined get route to serve a json response with metadata about the data and also
//serve the issues

app.post('/api/issues', function (req, res) {
  // obtain post request body data and create an issue 
  var newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = 'New';
  var err = _issue2.default.validateIssue(newIssue);
  //checks for any errors during newIssue validation check
  if (err) {
    //error occured in check execute block
    res.status(422).json({
      message: 'Invalid requrest: ' + err
    });
    //change status code to reflect error (unprocessible entity)
    //pass a message with the status
    return;
  }

  db.collection('issues').insertOne(newIssue).then(function (result) {
    db.collection('issues').find({
      _id: result.insertedId
    }).limit(1).next().then(function (newIssue) {
      res.json(newIssue);
    }).catch(function (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error: ' + error
      });
    });
  });
  //if there are no errors, add newIssue to issues and
  //send a json response with the newIssue object
});

var db = void 0;

_mongodb.MongoClient.connect('mongodb://localhost').then(function (connection) {
  db = connection.db('issueTracker');
  app.listen(3000, function () {
    console.log('Server on: localhost:3000');
  });
});
//set server to listen at port 3000 on sucessful MongoClient connection
//# sourceMappingURL=app.js.map