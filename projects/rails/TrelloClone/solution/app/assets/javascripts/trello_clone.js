window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},
  initialize: function() {
    new TrelloClone.Routers.Router;
    Backbone.history.start();
  }
};
