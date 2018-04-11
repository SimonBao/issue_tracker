'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true
};

var issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required'
};

//server side validation
//status check
//field type check

function validateIssue(issue) {
  if (issueFieldType) {
    for (var field in issueFieldType) {
      var type = issueFieldType[field];
      if (!type) {
        //edge case - unknown field obtained
        delete issue[field];
        // remove edge case field
      } else if (type === 'required' && !issue[field]) {
        // executes when field is required and is undefined
        return field + ' is required.';
        // returns missing field error
      }
    }
  }

  if (!validIssueStatus[issue.status])
    //if the issue status is not one of the approve statuses 
    return issue.status + ' is not a valid status.';
  //return invalid status error

  return null;
  //return nothing is there are no errors
}

exports.default = {
  validateIssue: validateIssue
};
//# sourceMappingURL=issue.js.map