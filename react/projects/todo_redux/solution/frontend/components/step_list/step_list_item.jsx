import React from 'react';

function StepListItem ({ step, destroyStep, toggleStep }) {
  return (
    <div className="step-header">
      { step.title}
      <button onClick={toggleStep.bind(null, step)}>{step.done ? "Undo" : "Done"}</button>
      <button onClick={destroyStep.bind(null, step)}>Delete</button>
    </div>
  );
}

export default StepListItem;
