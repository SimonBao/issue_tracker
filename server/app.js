
import express from 'express';
//express web application framework for serving data

import bodyParser from 'body-parser';
//body-parser middleware to extract data from request body

import {MongoClient} from 'mongodb';
import Issue from './issue.js'
import 'babel-polyfill'

const app = express();
//instantiates express;
app.use(express.static('static'));
//add middleware layer to handle static routing
//built in express middleware to serve html files relative to request path
app.use(bodyParser.json());
//add bodyParser middleware layer to extract request body into a json obect

app.get('/api/issues', (req, res) => {
  db.collection('issues').find().toArray().then(issues => {
    const metadata = {
      total_count: issues.length
    };
    res.json({
      _metadata: metadata,
      records: issues
    });
  }).catch(error => {
    console.log(error);
  });
});
//defined get route to serve a json response with metadata about the data and also
//serve the issues

app.post('/api/issues', (req, res) => {
  // obtain post request body data and create an issue 
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';
  const err = Issue.validateIssue(newIssue)
  //checks for any errors during newIssue validation check
  if (err) {
    //error occured in check execute block
    res.status(422).json({
      message: `Invalid requrest: ${err}`
    });
    //change status code to reflect error (unprocessible entity)
    //pass a message with the status
    return;
  }

  db.collection('issues').insertOne(newIssue).then(result => {
    db.collection('issues').find({
      _id: result.insertedId
    }).limit(1).next().then(
      newIssue => {
        res.json(newIssue);
      }
    ).catch(error => {
      console.log(error);
      res.status(500).json({
        message: `Server error: ${error}`
      })
    })
  })
  //if there are no errors, add newIssue to issues and
  //send a json response with the newIssue object
});

let db;

MongoClient.connect('mongodb://localhost').then(connection => {
  db = connection.db('issueTracker');
  app.listen(3000, () => {
    console.log('Server on: localhost:3000')
  });
});
//set server to listen at port 3000 on sucessful MongoClient connection