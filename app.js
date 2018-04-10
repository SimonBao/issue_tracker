'use strict'

const express = require('express');
//express web application framework for serving data
const bodyParser = require('body-parser');
//body-parser middleware to extract data from request body
const MongoClient = require('mongodb').MongoClient;
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

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};

const issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required',
};

//server side validation
//status check
//field type check

function validateIssue(issue) {
  if (issueFieldType) {
    for (const field in issueFieldType) {
      const type = issueFieldType[field];
      if (!type) {
        //edge case - unknown field obtained
        delete issue[field];
        // remove edge case field
      } else if (type === 'required' && !issue[field]) {
        // executes when field is required and is undefined
        return `${field} is required.`;
        // returns missing field error
      }
    }
  }


  if (!validIssueStatus[issue.status])
    //if the issue status is not one of the approve statuses 
    return `${issue.status} is not a valid status.`;
  //return invalid status error

  return null;
  //return nothing is there are no errors
}

app.post('/api/issues', (req, res) => {
  // obtain post request body data and create an issue 
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';
  const err = validateIssue(newIssue)
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

  db.collection('issues').insertOne(newIssue).then(result =>{
    db.collection('issues').find({_id: result.insertedId}).limit(1).next().then(
      newIssue => {
        res.json(newIssue);
      }
    ).catch(error => {
      console.log(error);
      res.status(500).json({message: `Server error: ${error}`})
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

// MongoClient.connect('mongodb://localhost:27017', (err, client) => {
//   // Client returned
//   db = client.db('issueTracker');
//   app.listen(3000, () => {
//     console.log('Server on: localhost:3000')
//   });
// });
//set server to listen at port 3000