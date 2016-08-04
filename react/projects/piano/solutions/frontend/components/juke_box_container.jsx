import { connect } from 'react-redux';
import { deleteTrack } from '../actions/tracks_actions';
import { groupUpdate } from '../actions/notes_actions';
import JukeBox from './juke_box';

const mapStateToProps = ({ tracks, recording }) => ({
  tracks,
  recording
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => e => {
    dispatch(deleteTrack(id));
  },
  onPlay: track => e => {
    const roll = track.roll;
    const playBackStartTime = Date.now();
    let currNote = 0;
    let timeElapsed;

    let interval = setInterval(() => {
      if (currNote < roll.length) {
        timeElapsed = Date.now() - playBackStartTime;

        if (timeElapsed >= roll[currNote].timeSlice) {
          dispatch(groupUpdate(roll[currNote].notes));
          currNote++;
        }
      } else {
        clearInterval(interval);
      }
    }, 1);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JukeBox);
