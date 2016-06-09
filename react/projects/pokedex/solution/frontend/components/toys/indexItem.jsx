var React = require('react');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  showDetail: function () {
    var url = '/pokemon/' + this.props.toy.pokemon_id + '/toys/' + this.props.toy.id;
    this.context.router.push(url);
  },

  render: function () {
    var attrs = ['name', 'happiness', 'price'].map(function (attr) {
      return <p key={attr}>{attr}: {this.props.toy[attr]}</p>;
    }.bind(this));

    return(
      <li onClick={this.showDetail} className="toy-list-item">
        {attrs}
      </li>
    );
  }
});
