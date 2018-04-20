import React from 'react';
import { Link } from 'react-router-dom'

export default class IssueEdit extends React.Component{
  render(){
    return(
      <div>
        <p>This is a placeholder for editing {this.props.match.params.id}</p>
        <Link to="/issues"> Back to Issues </Link>
      </div>
    );
  }
}
