const AppDispatcher = require("../dispatcher/dispatcher");
const OrganConstants = require("../constants/organ_constants");

const KeyActions = {
  groupUpdate(notes) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.GROUP_UPDATE,
      notes
    });
  },

  keyPressed(noteName) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.KEY_PRESSED,
      note: noteName
    });
  },

  keyReleased(noteName) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.KEY_RELEASED,
      note: noteName
    });
  }
};

module.exports = KeyActions;
