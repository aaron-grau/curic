JqueryUiDemo.Collections.Todos = Backbone.Collection.extend({
  url: "api/todos",
  model: JqueryUiDemo.Models.Todo,
  comparator: function(todo){
    return todo.get("todo_order");
  }
});
