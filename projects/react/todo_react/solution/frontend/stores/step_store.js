var _steps = {}, _callbacks = [];

var StepStore = {
  changed: function(){
    _callbacks.forEach(function(cb){ cb(); });
  },

  addChangedHandler: function(callback){
    _callbacks.push(callback);
  },

  removeChangedHandler: function(callback){
    _callbacks.splice(_callbacks.indexOf(callback), 1);
  },

  fetch: function(todo_id) {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'api/todos/' + todo_id + '/steps' ,
      success: function(resp) {
        _steps[todo_id] = resp;
        that.changed();
      }
    });
  },

  create: function(step) {
    var todo_id = step.todo_id;
    var that = this;
    $.ajax({
      method: 'POST',
      url: 'api/todos/' + todo_id + '/steps',
      data: {step: step},
      success: function(resp) {
        _steps[todo_id] = _steps[todo_id] || [];
        _steps[todo_id].push(resp);
        that.changed();
      }
    });
  },

  find: function(todo_id, id) {
    var idx = -1;
    var steps = _steps[todo_id] || [];

    for (var i = 0; i < steps.length; i++) {
      if (steps[i].id === id) {
        idx = i;
        break;
      }
    }

    return idx;
  },

  destroy: function(todo_id, id) {
    var that = this;
    var idx = this.find(todo_id, id);
    var step = _steps[todo_id][idx];

    if (step) {
      $.ajax({
        method: 'DELETE',
        url: 'api/steps/'+ id,
        success: function() {
          _steps[todo_id].splice(idx, 1);
          that.changed();
        }
      });
    }
  },

  all: function(id){
    _steps[id] = _steps[id] || [];
    return _steps[id].slice();
  },

  toggleDone: function(todo_id, id) {
    var that = this;
    var step = _steps[todo_id][this.find(todo_id, id)];
    var done = !step.done;

    if (step) {
      $.ajax({
        method: 'PATCH',
        url: 'api/steps/'+ id,
        data: { step: {done: done}},
        success: function() {
          step.done = done;
          that.changed();
        }
      });
    }
  }
};

module.exports = StepStore;
