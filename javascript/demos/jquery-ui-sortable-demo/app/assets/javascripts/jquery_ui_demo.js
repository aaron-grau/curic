window.JqueryUiDemo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl) {
    JqueryUiDemo.lists = new JqueryUiDemo.Collections.Lists();
    JqueryUiDemo.lists.fetch();
    //we could put the view render inside the 'success' callback
    // of the fetch, BUT that's not so important.

    //So long as our view does listen_to the collection, it
    //will update when fetch finishes.

    var listsView = new JqueryUiDemo.Views.ListsView({
      collection: JqueryUiDemo.lists
    });
    // no router needed: we just have one page

   $rootEl.html(listsView.render().$el);
  }
};

$(document).ready(function(){
  JqueryUiDemo.initialize($(".container"));
});
