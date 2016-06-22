const React = require('react');
const NoteKey = require('../components/note_key');
const JukeBox = require('../components/juke_box');
const Recorder = require('../components/recorder');
const TONES = require("../constants/tones");
const KeyStore = require('../stores/key_store');
const AddKeyListeners = require("../util/add_key_listeners");

const Organ = React.createClass({
  getInitialState() {
    return { notes: KeyStore.all() };
  },

  componentDidMount() {
    this.keyListener = KeyStore.addListener(this._onChange);
    AddKeyListeners();
  },

  _onChange() {
    this.setState({notes: KeyStore.all()});
  },

  componentWillUnmount() {
    this.keyListener.remove();
  },

  render() {
    return (
      <div className="organ-app">
        <h1>
          <a className="not-link" href="https://media.giphy.com/media/26vUT3HtrIrWESFcA/giphy.gif">
            Organ Grinder!
          </a>
        </h1>
        <h4>Use keys (asdfjkl;) to play music</h4>
        <div className="keys group">
          {
            Object.keys(TONES).map( (noteName, idx) => {
              return <NoteKey noteName={noteName} idx={idx} key={noteName}/>
            })
          }
        </div>
        <Recorder/>
        <JukeBox/>
      </div>
   );
  }
});

module.exports = Organ;
