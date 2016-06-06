const React = require('react');
const IndexItem = require('./IndexItem');

const Index = React.createClass({
  render() {
    const benches = this.props.benches;
    const benchKeys = Object.keys(benches);
    return (
      <div>
        <h1>Index</h1>
        {
          benchKeys.map( key => {
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
