var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.comments.map((function (comment) {
      return (
        <li key={comment.id}>
          <CommentDetail comment={comment}
                         context={this.props.context} />
        </li>
      );
    }).bind(this));

    return (
      <ul>{commentNodes}</ul>
    );
  }
});
