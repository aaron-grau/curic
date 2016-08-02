import React from 'react';
import $ from 'jquery';
import { NOTES } from '../constants/tones'


class Piano extends React.Component {
  constructor(props) {
     super(props);
  }

  componentDidMount() {
    $(document).on('keydown', e => {
      this.props.keyDown(e.key)
    });
    $(document).on('keyup', e => {
      this.props.keyUp(e.key)
    });
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
