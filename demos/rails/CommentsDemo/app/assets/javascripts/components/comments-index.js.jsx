var CommentsIndex = React.createClass({
  allChecked: function () {
    return (this.state.checkedIds.length == this.state.comments.length);
  },

  noneChecked: function () {
    return (this.state.checkedIds.length == 0);
  },

  toggleCheckAll: function () {
    if (!this.allChecked()) {
      this.setState({
        checkedIds: _(this.state.comments).map("id").value()
      });
    } else {
      this.setState({ checkedIds: [] });
    }
  },

  childComments: function (id) {
    return _(this.state.comments).where({ parent_comment_id: id });
  },

  componentDidMount: function () {
    this.postRender();
    this.fetchComments();
  },

  componentDidUpdate: function () {
    this.postRender();
  },

  createComment: function (commentParams) {
    return $.ajax({
      type: "POST",
      url: "/comments",
      data: { comment: commentParams }
    }).then(this.fetchComments);
  },

  destroyComment: function (id) {
    return $.ajax({
      type: "DELETE",
      url: "/comments/" + id
    }).then(this.fetchComments);
  },

  fetchComments: function () {
    $.ajax({ type: "GET", url: "/comments" }).then((function (comments) {
      var newCheckedIds =
        _.intersection(this.state.checkedIds, _.pluck(comments, "id"));

      this.setState({
        checkedIds: newCheckedIds,
        comments: comments
      });
    }).bind(this));
  },

  getComment: function (id) {
    return _(this.state.comments).first({ id: id });
  },

  getInitialState: function () {
    return {
      comments: [],
      checkedIds: []
    };
  },

  isChecked: function (id) {
    return _(this.state.checkedIds).contains(id);
  },

  markAll: function (state) {
    $.ajax({
      type: "POST",
      url: "/comments/mark_read",
      data: { comment_ids: this.state.checkedIds, state: state }
    }).then((function () {
      this.setState({ checkedIds: [] });
      this.fetchComments();
    }).bind(this));
  },

  postRender: function () {
    this.refs.checkAllCheckbox.getDOMNode().indeterminate =
      !(this.allChecked() || this.noneChecked());
  },

  render: function () {
    return (
      <div>
        <h3>Comments Upon Comments!</h3>
        <button onClick={this.markAll.bind(null, true)}>
          Mark All As Read!
        </button>
        <button onClick={this.markAll.bind(null, false)}>
          Mark All As Unread!
        </button>
        <label>
          <input type="checkbox"
                 checked={this.allChecked() && (this.state.checkedIds.length > 0)}
                 onChange={this.toggleCheckAll}
                 ref="checkAllCheckbox" />
          Check All!
        </label>

        <CommentList comments={this.childComments(null)}
                     context={this} />
        <CommentReply context={this} />
      </div>
    );
  },

  toggleChecked: function (id) {
    if (this.isChecked(id)) {
      this.setState({
        checkedIds: _(this.state.checkedIds).without(id).value()
      });
    } else {
      this.setState({
        checkedIds: this.state.checkedIds.concat([id])
      });
    }
  },
});
