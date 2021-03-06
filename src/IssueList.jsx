import IssueAdd from './IssueAdd.jsx'
import IssueFilter from './IssueFilter.jsx'
import IssueTable from './IssueTable.jsx'
import React from 'react';
import 'whatwg-fetch';

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] }
    this.createIssue = this.createIssue.bind(this);
  }
  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate)
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          const newIssues = this.state.issues.concat(updatedIssue);
          this.setState({ issues: newIssues });
        });
      } else {
        response.json().then(error => {
          alert("Failed to add issue: " + error.message)
        });
      }
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  }

  loadData() {
    fetch('/api/issues').then(response => {
      return response.json()
    }
    ).then(data => {
      console.log("Total amount of records:", data._metadata.total_count);
      data.records.forEach(issue => {
        issue.created = new Date(issue.created);
        if (issue.completionDate) {
          issue.completionDate = new Date(issue.completionDate);
        }
      });
      this.setState({ issues: data.records });
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div id='issueList'>
        <h1>Issue Tracker</h1>
        < IssueFilter />
        <hr />
        < IssueTable issues={this.state.issues} />
        <hr />
        < IssueAdd createIssue={this.createIssue} />
      </div>
    )
  }
}