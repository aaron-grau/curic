const React = require('react');
const NoteKey = require('../components/NoteKey');
const JukeBox = require('../components/JukeBox');
const Recorder = require('../components/Recorder');
const TONES = require("../constants/Tones");
const KeyStore = require('../stores/KeyStore');

const Organ = React.createClass({
  componentDidMount() {
    KeyStore.addListener(this._onChange);
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
