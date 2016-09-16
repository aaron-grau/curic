# Object.freeze

As you saw in the [Redux reducer][reducer] reading, a reducer must never mutate its
arguments. If the state changes, the reducer must return a new object.

Javascript provides us with an easy way to enforce this. Read up on
[Object.freeze][obj-freeze]. This method renders an object immutable, which is exactly
what we want.

By calling `Object.freeze(state)` at the top of every reducer, we can ensure that the
state is never accidentally mutated.

[obj-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[reducer]: reducers.md
