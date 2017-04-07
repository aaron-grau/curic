# Exceptions & Error Handling  

Estimated time: 30min.

## Learning Goals

* Know how to `raise` and `rescue` an exception
* Be able to explain how an exception bubbles up after it is raised
* Know when to use `ensure` and `retry`
* Be able to choose an appropriate exception class

## Phase 1: Memory 2 Memory Puzzle

Go back to our [Memory solutions][memory-solutions] from w1d2 and harden the code, looking for places where we could throw exceptions and places where we could use `rescue`-`retry` statements rather than plain loops. Make sure you

* Use `raise` to raise an error at least once, setting both the exception class, and the error message
* Use `rescue` and `retry` at least once
* In a `rescue` block, capture the error object and use it to print the error message

This project should be quick. Don't worry too much about best practices - the goal is just to get familiar with Ruby error handling syntax. If you spend more than an hour working on the project, call over a TA for help.

## Resources

* [Exceptions/Error Handling reading][error-reading] from last night
* [Skorks on exceptions][skorks-exceptions]
* [Ruby Patterns][Ruby-Patterns]

[error-reading]: ../../readings/errors.md
[skorks-exceptions]: http://www.skorks.com/2009/09/ruby-exceptions-and-exception-handling/
[Ruby-Patterns]: https://github.com/adomokos/DesignPatterns-Ruby/
[memory-solutions]: ../memory/solution/
