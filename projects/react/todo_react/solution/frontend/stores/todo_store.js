var _todos = [], _handlers = [];

var TodoStore = {
  changed: function(){
    _handlers.forEach(function(cb){ cb(); });
  },

  addChangedHandler: function(callback){
    _handlers.push(callback);
  },

  removeChangedHandler: function(callback){
    _handlers.splice(_handlers.indexof(callback), 1);
  },

  fetch: function() {
    var that = this;
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
    var that = this;
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
    var idx = -1;
    for (var i = 0; i < _todos.length; i++) {
      if (_todos[i].id === id) {
        idx = i;
        break;
      }
    }

    return idx;
  },

  destroy: function(id) {
    var that = this, idx = this.find(id), todo = _todos[idx];

    if (todo) {
      $.ajax({
        method: 'DELETE',
        url: 'api/todos/' + id,
        success: function() {
          _todos.splice(idx, 1);
          that.changed();
        }
      });
    }
  },

  all: function(){
    return _todos.slice();
  },

  toggleDone: function(id) {
    var that = this;
    var todo = _todos[this.find(id)];
    var done = !todo.done;

    if (todo) {
      $.ajax({
        method: 'PATCH',
        url: 'api/todos/' + id,
        data: { todo: {done: done}},
        success: function() {
          todo.done = done;
          that.changed();
        }
      });
    }
  }
};

module.exports = TodoStore;
