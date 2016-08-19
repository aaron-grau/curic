import React from 'react';

class Currency extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let color = "green";
    if(this.props.rate < 1) {
      color = "red";
    }

    return (
      <div className={color}>
        {this.props.name}
        &nbsp;
        {this.props.rate}
      </div>
    );
  }
};

export default Currency;
