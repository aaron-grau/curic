'use strict';
const React = require('react');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  showDetail () {
    this.context.router.push('/pokemon/'+ this.props.pokemon.id);
  },

  render () {
    return(
      <li onClick={this.showDetail} className="poke-list-item">
        <p>Name: {this.props.pokemon.name}</p>
        <p>Poke Type: {this.props.pokemon.poke_type}</p>
      </li>
    );
  }
});
