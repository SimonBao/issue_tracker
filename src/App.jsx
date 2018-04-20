import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const noMatch = () => <p> Page Not Found </p>;

const RoutedApp = () => (
  <HashRouter >
    <div>
      <Redirect from="/" to="/issues" />
      <Route path="/issues" component={IssueList} />
      <Route path="/IssueEdit" component={IssueEdit} />
    </div>
  </HashRouter>
)


ReactDOM.render(<RoutedApp />, contentNode);      
// Render the component inside the content Node