export const fetchBenches = (filters, success) => {
  $.ajax({
    method: 'GET',
    url: 'api/benches',
    data: filters,
    success
  });
};

export const fetchBench = (id, success) => {
  $.ajax({
    method: 'GET',
    url: `api/benches/${id}`,
    success
  });
};

export const createReview = (review, success) => {
  $.ajax({
    method: 'POST',
    url: 'api/reviews',
    data: review,
    success
  });
};

export const createBench = (bench, success) => {
  $.ajax({
    method: 'POST',
    url: 'api/benches',
    data: bench,
    success
  });
};
