// const AppDispatcher = require("../dispatcher/dispatcher");
// const OrganConstants = require("../constants/organ_constants");
//
// const KeyActions = {
//   groupUpdate(notes) {
//     AppDispatcher.dispatch({
//       actionType: OrganConstants.GROUP_UPDATE,
//       notes
//     });
//   },
//
//   keyPressed(noteName) {
//     AppDispatcher.dispatch({
//       actionType: OrganConstants.KEY_PRESSED,
//       note: noteName
//     });
//   },
//
//   keyReleased(noteName) {
//     AppDispatcher.dispatch({
//       actionType: OrganConstants.KEY_RELEASED,
//       note: noteName
//     });
//   }
// };
//
// module.exports = KeyActions;

export const PianoConstants = {
  KEY_PRESSED: "KEY_PRESSED",
  KEY_RELEASED: "KEY_RELEASED",
  GROUP_UPDATE: "GROUP_UPDATE",
}

export const groupUpdate = keys => ({
  type: PianoConstants.GROUP_UPDATE,
  keys
});

export const keyPressed = key => ({
  type: PianoConstants.KEY_PRESSED,
  key
});

export const keyReleased = key => ({
  type: PianoConstants.KEY_RELEASED,
  key
});
