const React = require('react');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  showDetail () {
    const url = `/pokemon/${this.props.toy.pokemon_id}/toys/${this.props.toy.id}`;
    this.context.router.push(url);
  },

  render () {
    const attrs = ['name', 'happiness', 'price'].map((attr) => {
      return <p key={attr}>{attr}: {this.props.toy[attr]}</p>;
    });

    return(
      <li onClick={this.showDetail} className="toy-list-item">
        {attrs}
      </li>
    );
  }
});
