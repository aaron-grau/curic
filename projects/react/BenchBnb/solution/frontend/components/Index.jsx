var React = require('react');
var IndexItem = require('./IndexItem');

var Index = React.createClass({
  render: function(){
    var benches = this.props.benches;
    var benchKeys = Object.keys(benches);
    return (
      <div>
        <h1>Index</h1>
        {
          benchKeys.map(function(key){
            return (<IndexItem
              bench={benches[key]}
              key={key} />);
          })
        }
      </div>
    );
  }
});

module.exports = Index;
