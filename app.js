'use strict'

const express = require('express');
//express web application framework for serving data
const bodyParser = require('body-parser');
//body-parser middleware to extract data from request body
const app = express();
//instantiates express;
app.use(express.static('static'));
//add middleware layer to handle static routing
//built in express middleware to serve html files relative to request path
app.use(bodyParser.json());
//add bodyParser middleware layer to extract request body into a json obect
const issues = [
  {
    id: 1, status: 'Open', owner: 'Ravan',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddie',
    created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
];
//temporary server in-memory issues

app.get('/api/issues', (req, res) => {
  const metadata = { total_count: issues.length };
  res.json({ _metadata: metadata, records: issues });
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
  id: 'required',
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
  if(issueFieldType){
    for(const field in issueFieldType) {
      console.log('field: ', field);
      const type = issueFieldType[field];
      console.log('type: ', type);
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
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';
  const err = validateIssue(newIssue)
  //checks for any errors during newIssue validation check
  if (err) {
    //error occured in check execute block
    res.status(422).json({ message: `Invalid requrest: ${err}` });
    //change status code to reflect error (unprocessible entity)
    //pass a message with the status
    return;
  }
  issues.push(newIssue);
  res.json(newIssue);
  //if there are no errors, add newIssue to issues and
  //send a json response with the newIssue object
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});
//set server to listen at port 3000
