import React from 'react';
import $ from 'jquery';

class Piano extends React.Component {
  constructor(props) {
     super(props);
  }

  componentDidMount() {
    $(document).on('keydown', this.props.keyDown);
    $(document).on('keyup', this.props.keyUp);
  }

  render() {
    return (
      <div>
        Piano
      </div>
    );
  }
};

export default Piano;
