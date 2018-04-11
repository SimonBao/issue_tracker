import React from 'react';
export default class IssueAdd extends React.Component {
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