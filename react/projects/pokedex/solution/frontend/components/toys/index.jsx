var React = require('react');
var ToyIndexItem = require('./indexItem.jsx');

module.exports = React.createClass({
  render: function () {
    return(
      <ul>
        {this.props.toys && this.props.toys.map(function (toy) {
          return <ToyIndexItem key={toy.id} toy={toy} /> 
        })}
      </ul>
    );
  }
});
