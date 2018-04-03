const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
  render() {
    return (
      <div id='issueFilter'>Placeholder for IssueFilter</div>
    )
  }
}



class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate ?
          issue.completionDate.toDateString() : ''}</td>
        <td>{issue.title}</td>
      </tr>
    )
  }
}

IssueRow.propTypes = {
  issue: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string
  })
}


IssueRow.defaultProps = {
  issue: React.PropTypes.shape({
    title: '-- No title!! --'
  })
}

class Button extends React.Component {
  render() {
    return (
      <button>Click Me!</button>
    )
  }
}


class IssueTable extends React.Component {
  render(){
    const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>)
    console.log({issueRows})
    return(
        <table className='bordered-table'>
          <thead>
            <tr>
              <th>Id</th>      
              <th>Status</th>      
              <th>Owner</th>            
              <th>Created</th>      
              <th>Effort</th>      
              <th>Completion Date</th>      
              <th>Title</th>    
            </tr>  
          </thead>
          <tbody> 
            {issueRows}
          </tbody>
        </table>
    )
  }
}

class IssueAdd extends React.Component {
  render() {
    return (
      <div id='issueAdd'>Placeholder for IssueAdd</div>
    )
  }
}

const issues = [
  {
    id: 1, status: 'Open', owner: 'Ravan',
    created: new Date('2018-04-03'), effort: 5, completionDate: undefined,
    title: 'Error in console when clicking Add'
  },
  {
    id: 2, status: 'Assigned', owner: 'Matt',
    created: new Date('2018-04-02'), effort: 2, completionDate: new Date('2018-04-03'),
    title: 'Missing bottom border on panel'
  },
  {
    id: 3, status: 'Assigned', owner: 'Jim',
    created: new Date('2018-04-02'), effort: 2, completionDate: new Date('2018-04-03'),
    title: ''
  },
];


class IssueList extends React.Component {
  render() {
    return (
      <div id='issueList'>
        <h1>Issue Tracker</h1>
        < IssueFilter />
        <hr />
        < IssueTable issues={issues} />
        <hr />
        < IssueAdd />
      </div>
    )
  }
}

ReactDOM.render(<IssueList />, contentNode);      // Render the component inside the content Node