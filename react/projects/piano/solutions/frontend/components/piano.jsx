import React from 'react';
import $ from 'jquery';
import { NOTES } from '../constants/tones'


class Piano extends React.Component {
  constructor(props) {
     super(props);
  }

  componentDidMount() {
    $(document).on('keydown', this.props.keyDown);
    $(document).on('keyup', this.props.keyUp);
  }

  render() {
    console.log(this.props.notes);
    return (
      <div>
        <ul>
        {
          NOTES.map((note, idx) => {
            return <li key={idx}>{note}</li>
          })
        }
        </ul>
      </div>
    );
  }
};

export default Piano;
