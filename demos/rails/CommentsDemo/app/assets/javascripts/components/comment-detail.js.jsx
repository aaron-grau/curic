var CommentDetail = React.createClass({
  beginEdit: function () {
    this.setState({ editing: true });
  },

  childComments: function () {
    return this.props.context.childComments(this.props.comment.id);
  },

  destroyComment: function () {
    this.props.context.destroyComment(this.props.comment.id);
  },

  endEdit: function () {
    this.setState({ editing: false });
  },

  getInitialState: function () {
    return { editing: false };
  },

  isChecked: function () {
    return this.props.context.isChecked(this.props.comment.id);
  },

  render: function () {
    var commentReply = (
      <CommentReply
        commentId={this.props.comment.id}
        context={this.props.context}
        onFinish={this.endEdit} />
    );

    var buttons = (
      <div>
        <button onClick={this.beginEdit}>Reply</button>
        <button onClick={this.destroyComment}>Destroy!</button>
      </div>
    );

    return (
      <div>
        <label>
          <input type="checkbox"
                 checked={this.isChecked()}
                 onChange={this.toggleCommentChecked} />
          {this.props.comment.text}
        </label>
        {this.props.comment.read ? null : " (Unread)"}
        {this.state.editing ? commentReply : buttons}

        <CommentList comments={this.childComments()}
                     context={this.props.context} />
      </div>
    );
  },

  toggleCommentChecked: function () {
    this.props.context.toggleChecked(this.props.comment.id);
  }
});
