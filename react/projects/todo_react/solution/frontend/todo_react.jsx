"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const root = document.getElementById('root');
const TodoList = require('./components/todo_list');

ReactDOM.render(<TodoList />, root);
