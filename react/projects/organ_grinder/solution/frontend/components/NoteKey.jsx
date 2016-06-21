const React = require('react');
const KeyStore = require('../stores/KeyStore');
const Note = require('../util/Note');
const TONES = require('../constants/Tones');

const NoteKey = React.createClass({
  componentDidMount() {
    this.note = new Note(TONES[this.props.noteName]);
    this.keyListener = KeyStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.keyListener.remove();
  },

  getInitialState() {
    return { pressed: this.thisKeyPressed() };
  },

  render() {
    let className = "note-key";
    if(this.state.pressed){
      className += " pressed";
    }
    return <div className={className}>{this.props.noteName}</div>;
  },

  thisKeyPressed() {
    const keys = KeyStore.all();
    return keys.indexOf(this.props.noteName) !== -1;
  },

  _onChange() {
    const pressed = this.thisKeyPressed();
    if (pressed) {
      this.note.start();
    } else {
      this.note.stop();
    }
    this.setState({ pressed });
  }
});

module.exports = NoteKey;
