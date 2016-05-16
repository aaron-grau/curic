Todos = function(changed){
  this.changed = changed || function(){};
  this.todoItems = [];
}

Todos.prototype.fetch = function(){
  var that = this;
  $.ajax({
    url: "api/todos",
    method: "get",
    success: function(resp){
      that.todoItems = resp;
      that.changed();
    }
  })
}

Todos.prototype.create = function(options){
  var that = this;
  $.ajax({
    url: "api/todos",
    method: "post",
    data: {todo: options},
    success: function(resp){
      that.todoItems.push(resp);
      that.changed();
    }
  })

}

Todos.prototype.destroy = function(id){
  var idx, todo, that = this;
  idx = this.find(id);
  todo = this.todoItems[this.find(id)];
  if(todo){
    $.ajax({
      url: "api/todos/" + todo.id,
      method: "delete",
      success: function() {
        that.todoItems.splice(idx, 1);
        that.changed();
      }
    });
  }
}
Todos.prototype.find = function(id){
  var idx = -1, thisTodo;
  for(var i = 0; i < this.todoItems.length; i++){
    thisTodo = this.todoItems[i];
    if(thisTodo.id === id){
      idx = i;
      break;
    }
  }
  return idx;
}

Todos.prototype.toggleDone = function(id, success){
  var todo, done, that = this;
  todo = this.todoItems[this.find(id)];
  done = !todo.done;
  if(todo){
    $.ajax({
      url: "api/todos/" + todo.id,
      method: "patch",
      data: {todo: {done: done}},
      success: function() {
        todo.done = done;
        that.changed();
      }
    });
  }
}
