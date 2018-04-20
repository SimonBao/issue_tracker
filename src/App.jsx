import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, Redirect, Switch} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const noMatch = () => <p> Page Not Found </p>;

const RoutedApp = () => (
  <HashRouter>
    <Switch>
        <Route exact path="/" component={IssueList} />
        <Route exact path="/issues" component={IssueList} />
        <Route exact path="/issues/:id" component={IssueEdit} />
        <Route exact path="*" component={noMatch} />
    </Switch>
</HashRouter>
)



ReactDOM.render(<RoutedApp />, contentNode);      
// Render the component inside the content Node