import React from 'react';
// Components
import StepListItemContainer from './step_list_item_container';
import StepForm from './step_form';

function StepList({ steps, todo_id, createStep }){
  return(
    <div>
      <ul className="step-list">
        {steps.map(step => (
        	<StepListItemContainer 
        		key={step.id} 
        		step={step} />)
        )}
      </ul>
      <StepForm todo_id={todo_id} createStep={createStep}/>      
    </div>
  );
};

export default StepList;
