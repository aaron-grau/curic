"use strict";

const _todos = [], _handlers = [];

const TodoStore = {
  changed: () => {
    _handlers.forEach(function(cb){ cb(); });
  },

  addChangedHandler: function(callback){
    _handlers.push(callback);
  },

  removeChangedHandler: function(callback){
    _handlers.splice(_handlers.indexof(callback), 1);
  },

  fetch: () => {
    const that = this;
    $.ajax({
      method: 'GET',
      url: 'api/todos',
      dataType: 'json',
      success: function(resp) {
        _todos = resp;
        that.changed();
      }
    });
  },

  create: function(object) {
    const that = this;
    $.ajax({
      method: 'POST',
      url: 'api/todos',
      data: {todo: object},
      success: function(resp) {
        _todos.push(resp);
        that.changed();
      }
    });
  },

  find: function(id) {
    let idx = -1;
    for (let i = 0; i < _todos.length; i++) {
      if (_todos[i].id === id) {
        idx = i;
        break;
      }
    }

    return idx;
  },

  destroy: function(id) {
    const that = this, idx = this.find(id), todo = _todos[idx];

    if (todo) {
      $.ajax({
        method: 'DELETE',
        url: 'api/todos/' + id,
        success: () => {
          _todos.splice(idx, 1);
          that.changed();
        }
      });
    }
  },

  all: () => {
    return _todos.slice();
  },

  toggleDone: function(id) {
    const that = this;
    const todo = _todos[this.find(id)];
    const done = !todo.done;

    if (todo) {
      $.ajax({
        method: 'PATCH',
        url: 'api/todos/' + id,
        data: { todo: {done: done}},
        success: () => {
          todo.done = done;
          that.changed();
        }
      });
    }
  }
};

module.exports = TodoStore;
