!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=document.getElementById("contents"),u=function(e){function t(){return a(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("div",{id:"issueFilter"},"Placeholder for IssueFilter")}}]),t}(),i=function(e){return React.createElement("tr",null,React.createElement("td",null,e.issue.id),React.createElement("td",null,e.issue.status),React.createElement("td",null,e.issue.owner),React.createElement("td",null,e.issue.created.toDateString()),React.createElement("td",null,e.issue.effort),React.createElement("td",null,e.issue.completionDate?e.issue.completionDate.toDateString():""),React.createElement("td",null,e.issue.title))};function s(e){var t=e.issues.map(function(e){return React.createElement(i,{key:e.id,issue:e})});return React.createElement("table",{className:"bordered-table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"Id"),React.createElement("th",null,"Status"),React.createElement("th",null,"Owner"),React.createElement("th",null,"Created"),React.createElement("th",null,"Effort"),React.createElement("th",null,"Completion Date"),React.createElement("th",null,"Title"))),React.createElement("tbody",null,t))}!function(e){function t(){return a(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}o(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("button",null,"Click Me!")}}])}();var f=function(e){function t(){a(this,t);var e=c(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.handleSubmit=e.handleSubmit.bind(e),e}return o(t,React.Component),r(t,[{key:"handleSubmit",value:function(e){e.preventDefault();var t=document.forms.issueAdd;this.props.createIssue({status:"New",created:new Date,owner:t.owner.value,title:t.title.value}),t.owner.value="",t.title.value=""}},{key:"render",value:function(){return React.createElement("div",null,React.createElement("form",{id:"issueAdd",onSubmit:this.handleSubmit},React.createElement("input",{type:"text",name:"owner",placeholder:"Owner"}),React.createElement("input",{type:"text",name:"title",placeholder:"Title"}),React.createElement("button",null,"Add")))}}]),t}(),d=function(e){function t(){a(this,t);var e=c(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={issues:[]},e.createIssue=e.createIssue.bind(e),e}return o(t,React.Component),r(t,[{key:"createIssue",value:function(e){var t=this;fetch("/api/issues",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){e.ok?e.json().then(function(e){e.created=new Date(e.created),e.completionDate&&(e.completionDate=new Date(e.completionDate));var n=t.state.issues.concat(e);t.setState({issues:n})}):e.json().then(function(e){alert("Failed to add issue: "+e.message)})}).catch(function(e){alert("Error in sending data to server: "+e.message)})}},{key:"loadData",value:function(){var e=this;fetch("/api/issues").then(function(e){return e.json()}).then(function(t){console.log("Total amount of records:",t._metadata.total_count),t.records.forEach(function(e){e.created=new Date(e.created),e.completionDate&&(e.completionDate=new Date(e.completionDate))}),e.setState({issues:t.records})}).catch(function(e){console.log(e)})}},{key:"componentDidMount",value:function(){this.loadData()}},{key:"render",value:function(){return React.createElement("div",{id:"issueList"},React.createElement("h1",null,"Issue Tracker"),React.createElement(u,null),React.createElement("hr",null),React.createElement(s,{issues:this.state.issues}),React.createElement("hr",null),React.createElement(f,{createIssue:this.createIssue}))}}]),t}();ReactDOM.render(React.createElement(d,null),l)}]);