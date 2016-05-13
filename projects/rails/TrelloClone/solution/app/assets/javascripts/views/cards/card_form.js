TrelloClone.Views.CardForm = Backbone.LinkFormView.extend({
  formTemplate: JST['cards/form'],
  linkTemplate: JST['cards/form_link'],

  create: function (event) {
    event.preventDefault();

    this.collection.create({
      list_id: this.collection.list.id,
      ord: this.collection.length,
      title: this.$('textarea').val()
    }, { wait: true });

    this.$('textarea').val('');
    this.$('textarea').focus();
  },

  render: function () {
    var content;
    if (this.formShowing) {
      content = this.formTemplate();
    } else {
      content = this.linkTemplate();
    }

    this.$el.html(content);
    this.delegateEvents();
    this.collection.trigger('resize');
    return this;
  }
});
