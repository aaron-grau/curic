import React from 'react';

const JukeBox = ({ tracks, recording , onDelete, groupUpdate }) => {
  let interval;

  const play = (id) => () => {
    // if (interval) { return; } // don't play if a track's already playing

    const track = tracks[id];
    const roll = track.roll;
    const playBackStartTime = Date.now();
    let currentNote = 0;
    let timeElapsed;

    interval = setInterval(() => {
      if (currentNote < roll.length) {
        timeElapsed = Date.now() - playBackStartTime;

        // if we are at a timeslice with a note, play it and move on
        if (timeElapsed >= roll[currentNote].timeSlice) {
          groupUpdate(roll[currentNote].notes);
          currentNote++;
        }
      } else {
        clearInterval(interval);
      }
    }, 1);

  };


  return (
    <div>
      JukeBox
      <ul>
        {Object.keys(tracks).map(id => {
          return (
            <li key={id}>
              {id}
              <button
                disabled={recording}
                onClick={play(id)}
              >
                Play
              </button>
              <button
                disabled={recording}
                onClick={onDelete(id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
// (
//   <div>
//     JukeBox
//     <ul>
//       {Object.keys(tracks).map(id => {
//         return (
//           <li key={id}>
//             {id}
//             <button
//               disabled={recording}
//             >
//               Play
//             </button>
//             <button
//               disabled={recording}
//               onClick={onDelete(id)}
//             >
//               Delete
//             </button>
//           </li>
//         );
//       })}
//     </ul>
//   </div>
// );

export default JukeBox;


// <ul>
//   {
//     props.tracks.map((t) => {
//       return <li>{t.id}</li>
//     })
//   }
// </ul>
