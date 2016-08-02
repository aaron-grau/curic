import React from 'react';

function StepListItem ({ step, destroyStep, toggleStep }) {
  return (
    <li className="step-header">
      { step.title}
      <button
        className={step.done ? "done" : "undone"} 
        onClick={toggleStep.bind(null, step)}>
        {step.done ? "Undo" : "Done"}
      </button>
      <button 
        className="button"
        onClick={destroyStep.bind(null, step)}>
        Delete
      </button>
    </li>
  );
}

export default StepListItem;
