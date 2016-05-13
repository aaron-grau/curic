# Stacks and Queues

## Introduction

Stacks and queues are two simple linear data structures. Elements are
stored in order and can be added or removed one at a time. The
difference between a stack and a queue is that a stack is **first in,
last out** (FILO) while a queue is **first in, first out** (FIFO).
Unlike Ruby's Array data structure, most Stack and Queue implementations
do not expose methods to slice or sort the data, or to find a specific
element. The basic operations are:

- Stack
  - `push`: adds an element to the top of the stack
  - `pop`: removes an element from the top of the stack and returns it
- Queue
  - `enqueue`: adds an element to the back of the queue
  - `dequeue`: removes an element from the front of the queue and
    returns it

Either data structure may also expose a `peek` method, which returns the
"top" or "next" item without actually removing it.

Stacks and queues may be implemented in terms of simpler data
structures, such as linked lists, but in Ruby you can actually use an
Array as the underlying data store, as long as you don't expose it
publicly (i.e., don't define an `attr_reader` for it). We'll do this in
today's exercises.

## Exercises

### MyQueue

Implement a Queue class. Use the following `initialize` method as a
starting point:

```ruby
class MyQueue
  def initialize
    @store = []
  end
end
```

Implement `enqueue`, `dequeue`, `peek`, `size`, and `empty?` methods on your Queue.

### MyStack

Implement a Stack class. Use the following `initialize` method as a
starting point:

```ruby
class MyStack
  def initialize
    @store = []
  end
end
```

Implement `pop`, `push`, `peek`, `size`, and `empty?` methods on your Stack.

### StackQueue

Next, we're going to implement a queue again, but with a twist: rather
than use an Array, we will implement it using our `MyStack` class under
the hood.

Before you start to code this, sit down and talk to your partner about
how you might implement this. You should not modify your `MyStack`
class, but use the interface it provides to implement a queue. When
you're ready, implement this `StackQueue` class with `enqueue`,
`dequeue`, `size`, and `empty?` methods.

**Hint**: You will want to use more than one instance of `MyStack`.

**Hint 2**: What if you always pushed onto one stack, and always popped
from the other? How will these two stacks interact?

**Hint 3**: Think about how a slinky walks down stairs...

Ask your TA if you get stuck!

### MaxStack and MinMaxStack

Moving back to our `MyStack` class, let's modify it so that we always know
the maximum value in the stack. We could write a `max` method that calls
`@store.max`. However, this requires us to iterate over every item in the
`@store` array, which gives us a time complexity of O(n). This isn't good
enough for us; we want to be able to return the max in constant time (O(1)).
If we can't iterate over `@store`, how else could we modify the stack to
get this functionality?

Once you have `max` implemented, it should be easy to add a `min`
method. Do so.

**Hint**: We could store some metadata with the value of each element.
Think about how to do this and what information to store.

### MinMaxStackQueue

Now it's time to bring it all together. Take the techniques you've
learned (and the classes you've implemented) to implement a
MinMaxStackQueue. The goal at the end of this is to have `enqueue`,
`dequeue`, `max`, and `min` methods, all of which run in constant time.
Once we have this, we'll be well-equipped to produce an optimized
solution to the Windowed Max Range problem.
