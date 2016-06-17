# How do I save a new _______ (user, post, car, etc.) from a react component to rails?

## The short answer:

You probably have a form.  Put an [onSubmit handler (command-F for "onSubmit")][on-submit] on it.

When you submit, call an API action, like `ApiActions.saveUser(user)`.

Inside of `ApiActions.saveUser`, hit `apiUtil.postUser(user)`.

Once the server returns a successful response (200), dispatch an action (`ADD_USER`) to update the store.


Make sure you know how the process maps to the [Flux Architecture diagram][flux-diagram].

[on-submit]: https://facebook.github.io/react/docs/tutorial.html
[flux-diagram]: ../assets/flux-diagram.png
