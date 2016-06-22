const React = require('react');
const KeyStore = require('../stores/key_store');
const Note = require('../util/note');
const TONES = require('../constants/tones');

const NoteKey = React.createClass({
  getInitialState() {
    return { pressed: this.thisKeyPressed() };
  },

  componentDidMount() {
    this.note = new Note(TONES[this.props.noteName]);
    this.keyListener = KeyStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.keyListener.remove();
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
  },

  render() {
    let className = `note-key key-${this.props.idx}`;
    if(this.state.pressed){
      className += " pressed";
    }
    return <div className={className}>{this.props.noteName}</div>;
  }
});

module.exports = NoteKey;
