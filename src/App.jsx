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
        <td >{issue.owner}</td>
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
  }),
}

class Button extends React.Component {
  render() {
    return (
      <button>Click Me!</button>
    )
  }
}


class IssueTable extends React.Component {
  render() {
    const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />)
    console.log({ issueRows })
    return (
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
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      status: 'New',
      created: new Date(),
      owner: form.owner.value,
      title: form.title.value
    });
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    return (
      <div>
        <form id='issueAdd' onSubmit={this.handleSubmit}>
          <input type='text' name='owner' placeholder='Owner'></input>
          <input type='text' name='title' placeholder='Title'></input>
          <button>Add</button>
        </form>
      </div>
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
  constructor() {
    super();
    this.state = { issues: [] }
    this.createIssue = this.createIssue.bind(this);
  }
  createIssue(newIssue) {
    const newIssues = this.state.issues.slice();
    newIssue.id = this.state.issues.length + 1;
    newIssues.push(newIssue);
    this.setState({ issues: newIssues });
  }

  updateState() {
    setTimeout(() => {
      this.setState({ issues: issues })
    }, 500);
  }

  componentDidMount() {
    this.updateState();
  }

  render() {
    return (
      <div id='issueList'>
        <h1>Issue Tracker</h1>
        < IssueFilter />
        <hr />
        < IssueTable issues={this.state.issues} />
        <hr />
        < IssueAdd createIssue={this.createIssue}/>
      </div>
    )
  }
}



ReactDOM.render(<IssueList />, contentNode);      // Render the component inside the content Node