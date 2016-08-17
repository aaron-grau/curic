# API Interactions in Redux

AJAX requests are handled in a Redux application by middleware. Like everything
else in Redux, AJAX requests and responses are handled by dispatching
actions to the store. We'll use middleware to handle and trigger the appropriate actions. 

## Creating an API Utility

The first and most basic step to setting up AJAX is to create a utility file that exports methods that we can call to make requests to the API. 

```
// frontend/utils/cat_api_util.js

export const fetchCats = (success, error) => {
	$.ajax({
		url: 'http://api.cats.com/all',
		method: 'get',
		success,
		error
	});
}

```

In the example above, we define and export a  `fetchCats()` method that hits our API. `fetchCats()` arguments are the success and error functions of the `$.ajax` call. We'll import this file into our middleware where we can then pass success and error callbacks that trigger appropriate dispatches to our Store. Note that because the callbacks are passed in as arguments, the API Utility itself is agnostic to your application setup, i.e. it would work equally well in Redux, Flux, or any other architecture.

## Creating an API Middleware