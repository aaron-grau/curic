JqueryUiDemo.Views.ListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "all", this.render);
    if(this.model.get("todos")){
         this.listenTo(this.model.get("todos"), "add change remove sync", this.render);
    }
  },

  template: JST["lists/show"],

  events: {
    "click button.delete-list": "deleteList",
    "click h3.list-title": "editTitle",
    "blur input.submit-title": "submitTitle",
    "sortstop": "sortToDo"
  },

  render: function(){
    if (this.model.get("todos")){
      this.model.get("todos").sort();
    }
    var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
    $(this.$el.find(".todo-list")).sortable({
      cursor: "move",
      opacity: 0.3,
      connectWith: ".todo-list"
      });
    return this;
  },

  sortToDo: function(event, ui) {
    var that = this;
    //find previous element's order, or 0
    var $todo = $(ui.item);
    var next_order = $todo.next("li").data("todo-order");
    var prev_order = $todo.prev("li").data("todo-order");
    //find next element's order, or prev_element + 2
    // turn your old order into the average of the two.
    var updated_order = this._calculatePosition(prev_order, next_order);
   var todoId = $todo.data("todo-id");
   var oldListId = $todo.data("list-id");
   var updatedTodoListId = $todo.parent().data("list-id");
   var todoModel = this.model.get("todos").get(todoId);
   todoModel.save({
     todo_order: updated_order,
     list_id: updatedTodoListId },
     { patch: true,
       success: function(model){
          $todo.data("todo-order", updated_order);
          that.model.get("todos").add(model);
          // remove it from the old list's collection
          JqueryUiDemo.lists.get(oldListId).get("todos").remove(model, { silent: true });
          $todo.data("list-id", updatedTodoListId);
         }
     });
  },

  _calculatePosition: function(prevPos, nextPos){
    if(!nextPos){
      if(!prevPos){
        return 1;
      } else {
        return (prevPos + 1);
      }
    } else if(!prevPos){
      return (nextPos / 2);
    }
    return (nextPos + prevPos) / 2;
  },

  deleteList: function(e){
    //destroying the list triggers render on the index view
    this.model.destroy({
      wait: true
    });
  },

  editTitle: function(e){
    var $titleEl = $(e.target);
    var currentTitle = $titleEl.text();
    var $titleInput = $("<input>").attr("type", "text").addClass("submit-title");
    $titleInput.val(currentTitle);
    $($titleEl.parent()).html($titleInput);
    $(".submit-title").focus();
  },

  submitTitle: function(e){
    var $titleInput = $(e.target);
    var updatedTitle = $titleInput.val();
    //add client side validation somewhere in here ideally
    var $titleEl = $("<h3>").addClass("panel-title list-title");
    $titleEl.text(updatedTitle);
    $($titleInput.parent()).html($titleEl);
    //update the list
    this.model.save({title: updatedTitle})
  }
})
