const React = require('react');
const ReactDOM = require('react-dom');
const TodoList = require('./components/todo_list');

const root = document.getElementById('root');

ReactDOM.render(<TodoList />, root);
