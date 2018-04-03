'use strict';

var contentNode = document.getElementById('contents');

var continents = ['Asia', 'Australia'];
var message = continents.map(function (c) {
  return 'Hello ' + c;
}).join(' ');
var component = React.createElement(
  'p',
  null,
  message
); // A simple component, written in JSX

ReactDOM.render(component, contentNode); // Render the component inside the content Node