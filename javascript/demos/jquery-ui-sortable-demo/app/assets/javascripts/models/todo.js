JqueryUiDemo.Models.Todo = Backbone.Model.extend({
  url: function(){
    var url = "api/todos";
    if(this.id){
      url += ("/" + this.id);
    }
    return url;
  }

});
