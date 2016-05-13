JqueryUiDemo.Models.List = Backbone.Model.extend({
  url: function(){
    var url = "api/lists";
    if(this.id){
      url += ("/" + this.id);
    }
    return url;
  },
  parse: function(data){
    data.todos = new JqueryUiDemo.Collections.Todos(data.todos);
    return data;
  },
  toJSON: function(){
    var json = _.extend({}, this.attributes);
    if(this.get("todos")){
     json.todos = this.get("todos").toJSON();
    }
    return json;
  }
});
