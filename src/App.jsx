const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
  render() {
    return (
      <div id='issueFilter'>Placeholder for IssueFilter</div>
    )
  }
}


const IssueRow = (props) => (
  <tr>
    <td>{props.issue.id}</td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.effort}</td>
    <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
    <td>{props.issue.title}</td>
  </tr>
)





class Button extends React.Component {
  render() {
    return (
      <button>Click Me!</button>
    )
  }
}

function IssueTable(props){
  const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);
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



class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
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
        < IssueAdd createIssue={this.createIssue} />
      </div>
    )
  }
}



ReactDOM.render(<IssueList />, contentNode);      // Render the component inside the content Node