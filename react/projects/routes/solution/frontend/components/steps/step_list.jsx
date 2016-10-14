import React from 'react';

import StepListItem from './step_list_item';

function StepList({ todoId, steps, createStep }){
  return(
    <div>
      <ul className="step-list">
        {steps.map(step => (
        	<StepListItem
        		key={step.id}
        		step={step} />)
        )}
      </ul>
    </div>
  );
};

export default StepList;
