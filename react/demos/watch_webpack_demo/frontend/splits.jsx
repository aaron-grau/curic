var React = require('react');

var Splits = React.createClass({
  render: function () {
    return(
      <ul>
        {
          this.props.splits.map(function(split){
            return <li>{split}</li>;
          })
        }
      </ul>
    );
  }
});

module.exports = Splits;
