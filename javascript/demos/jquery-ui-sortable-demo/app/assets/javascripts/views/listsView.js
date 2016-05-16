JqueryUiDemo.Views.ListsView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, "all", this.render);
  },

  template: JST["lists/index"],

  events: {
    "click button#add-list": "newList",
    "blur .submit-new-list-title": "submitNewList"
  },

  render: function(){
   console.log("rendering listsView")
    var renderedContent = this.template({
      lists: this.collection
    });
    this.$el.html(renderedContent);
    this.collection.each(function(list){
      var listView = new JqueryUiDemo.Views.ListView({ model: list });
      $(".list-index").append(listView.render().$el);
    });
    return this;
  },

  newList: function(e){
    var $renderedNewListForm = JST["lists/new"]();
    $(".list-index").append($renderedNewListForm);
    $(".submit-new-list-title").focus();
  },

  submitNewList: function(e){
    var that = this;
    var $titleInput = $(e.target);
    var updatedTitle = $titleInput.val();
    var newList = new JqueryUiDemo.Models.List({title: updatedTitle});
    newList.save({}, {
      success: function(model){
        that.collection.add(model);
      }
    })
  }

})
