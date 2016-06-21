const React = require('react');
const NoteKey = require('../components/note_key');
const JukeBox = require('../components/juke_box');
const Recorder = require('../components/recorder');
const TONES = require("../constants/tones");
const KeyStore = require('../stores/key_store');
const AddKeyListeners = require("../util/add_key_listeners");

const Organ = React.createClass({
  componentDidMount() {
    this.keyListener = KeyStore.addListener(this._onChange);
    AddKeyListeners();
  },

  componentWillUnmount() {
    this.keyListener.remove();
  },

  getInitialState() {
    return { notes: KeyStore.all() };
  },

  render() {
    return (
      <div>
        <div className="keys group">
        {
          Object.keys(TONES).map(noteName => <NoteKey noteName={noteName} key={noteName}/>)
        }
        </div>
        <Recorder />
        <JukeBox />
      </div>
   );
  },

  _onChange() {
    this.setState({notes: KeyStore.all()});
  }
});

module.exports = Organ;
