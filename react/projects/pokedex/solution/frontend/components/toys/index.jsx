'use strict';
const React = require('react');
const ToyIndexItem = require('./index_item.jsx');

module.exports = React.createClass({
  render () {
    return(
      <ul>
        {this.props.toys && this.props.toys.map(function (toy) {
          return <ToyIndexItem key={toy.id} toy={toy} />;
        })}
      </ul>
    );
  }
});
