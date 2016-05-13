// I'm not using this anymore.

var CommentStore = _.extend({}, Events);

CommentStore.save = function (props) {
  return $.ajax({
    type: "POST",
    url: "/comments",
    data: { comment: props }
  }).then((function (comment) {
    this.trigger("CREATE", comment);
    return comment;
  }).bind(this));
};

CommentStore.destroy = function (id) {
  return $.ajax({
    type: "DELETE",
    url: "/comments/" + id
  }).then((function (id) {
    this.trigger("DESTROY", id);
    return id;
  }).bind(this));
};
