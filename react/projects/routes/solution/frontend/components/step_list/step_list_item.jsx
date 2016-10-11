import React from 'react';

function StepListItem ({ step, destroyStep, toggleStep }) {
  return (
    <li className="step-header">
      {step.title}
      <div className="step-buttons">
        <button
          className={step.done ? "done" : "undone"}
          onClick={toggleStep}>
          {step.done ? "Undo" : "Done"}
        </button>
        <button
          className="delete-button"
          onClick={destroyStep}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default StepListItem;
