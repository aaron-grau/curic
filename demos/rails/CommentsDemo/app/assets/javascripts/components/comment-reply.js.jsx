var CommentReply = React.createClass({
  getDefaultProps: function () {
    return {
      commentId: null,
      onFinish: null
    };
  },

  getInitialState: function () {
    return { text: "" };
  },

  render: function () {
    return (
      <div>
        <input type="text"
               value={this.state.text}
               onChange={this.updateText} />
        <br />
        <button onClick={this.createComment}>Submit!</button>
        {this.props.onFinish ?
          <button onClick={this.props.onFinish}>Cancel!</button>
          : null}
      </div>
    );
  },

  createComment: function () {
    this.props.context.createComment({
      parent_comment_id: this.props.commentId,
      text: this.state.text
    }).then((function () {
      this.setState({ text: "" });
      this.props.onFinish && this.props.onFinish();
    }).bind(this));
  },

  updateText: function (event) {
    this.setState({ text: event.target.value });
  },
});
