import React from 'react';
// Components
import StepListItemContainer from './step_list_item_container';
import StepForm from './step_form';

function StepList(props){
  return(
    <div>
      <ul className="step-list">
        {props.steps.map(step => <StepListItemContainer key={step.id} step={step} />)}
      </ul>
      <StepForm todo_id={props.todo_id} createStep={props.createStep}/>      
    </div>
  );
};

export default StepList;
