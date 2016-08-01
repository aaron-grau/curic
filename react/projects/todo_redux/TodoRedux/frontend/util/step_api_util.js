export const fetchSteps = function(success){
  $.ajax({
    method: 'GET',
    url: 'api/steps',
    data: filters,
    success
  });
};

export const fetchStep = function(id, success){
  $.ajax({
    method: 'GET',
    url: `api/steps/${id}`,
    success
  });
};

export const createStep = function(step, success){
  $.ajax({
    method: 'POST',
    url: 'api/steps',
    data: {step},
    success
  });
};

export const updateStep = function(step, success){
  $.ajax({
    method: 'PATCH',
    url: `api/steps/${step.id}`,
    data: {step},
    success
  });
};