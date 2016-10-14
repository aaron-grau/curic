import React from 'react';

function StepListItem ({ step }) {
  return (
    <li className="step-header">
      {step.title}
    </li>
  );
}

export default StepListItem;
