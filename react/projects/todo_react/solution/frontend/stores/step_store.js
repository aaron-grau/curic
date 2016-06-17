"use strict";

const _steps = {}, _callbacks = [];

const StepStore = {
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
    const that = this;
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
    const todo_id = step.todo_id;
    const that = this;
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
    const idx = -1;
    const steps = _steps[todo_id] || [];

    for (let i = 0; i < steps.length; i++) {
      if (steps[i].id === id) {
        idx = i;
        break;
      }
    }

    return idx;
  },

  destroy: function(todo_id, id) {
    const that = this;
    const idx = this.find(todo_id, id);
    const step = _steps[todo_id][idx];

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
    const that = this;
    const step = _steps[todo_id][this.find(todo_id, id)];
    const done = !step.done;

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
