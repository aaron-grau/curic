# Knight's Travails

**Read the entire problem before beginning!**

## Phase 0: Description

In this problem we want to write a class that will find a path for a
Chess Knight from a starting position to an end position.  Both the
starting and ending position should be on a standard 8x8 chess board.

**NB**: this problem is a lot like word chains!

Write a class, `KnightPathFinder`. Initialize your `KnightPathFinder`
with a starting position. For instance

    kpf = KnightPathFinder.new([0, 0])

Ultimately, I want to be able to find paths to end positions:

```ruby
kpf.find_path([2, 1]) # => [[0, 0], [2, 1]]
kpf.find_path([3, 3]) # => [[0, 0], [2, 1], [3, 3]]
```

To help us find paths, we want to build a **move tree**. The values in
the tree will be positions. A parent is connected to a child if you
can move from the parent position to the child position. The root of
the tree should be the knight's starting position. **You will want to
build on your `PolyTreeNode` work, using `PolyTreeNode` instances to
represent each position.**

We'll write a method `KnightPathFinder#build_move_tree` to build the
move tree and store it in an instance variable. We'll call this method
in `initialize`; you'll use the move tree whenever we call
`find_path`. **Don't write this yet though**.

## Phase I: `#new_move_positions`

Before we start `#build_move_tree`, you'll want to be able to find new
positions you can move to from a given position. Write a **class**
method `KnightPathFinder::valid_moves(pos)`. There are up to
eight possible moves.

You'll also want to avoid repeating positions in the move tree. For
instance, you don't want to get caught in a loop moving back-and-forth
between two adjacent positions. Add an instance variable,
`@visited_positions`; initialize it to the array of just the starting
pos. Write an **instance** method `#new_move_positions(pos)`; this
should call the `::valid_moves` class method, but then throw out any
positions that are already in `@visited_positions`. It should then add
the remaining new positions to `@visited_positions` and **return**
these new positions.

## Phase II: `#build_move_tree`

Let's return to `build_move_tree`. We'll use our `#new_move_positions`
instance method.

You want to make sure your tree will represent the shortest paths to
any position. Build your tree in a **breadth-first** manner. Take
inspiration from your BFS algorithm: use a queue to process nodes in
FIFO order. Start with a root node; build it from the start position.

Next build nodes representing positions one move away, add these to
the queue. Then take the next node from the queue. Etc.

Once you can build a move tree, **get a code review from your TA**.

## Phase III: `#find_path`

Now you are ready to write `#find_path(end_pos)`. Find path should
search in your move tree for the `end_pos`. You should use either
your `dfs` or `bfs` methods from the PolyTreeNode exercises; it
doesn't matter. This will return a tree node which is the final
destination.

This gives us a node, but not a path. Lastly, add a method
`#trace_path_back` to `KnightPathFinder`. This should trace
back from the node to the root using `PolyTreeNode#parent`. As it
goes up-and-up toward the root, it should add each value to an
array. `#trace_path_back` should **return** the values in order from the
target node up to the root.

Use `#trace_path_back` to finish up `#find_path`.

Here are some example paths that you can use for testing purposes:
(Yours might not be exactly the same, but should be the same number of
steps.)

```ruby
kpf.find_path([7, 6]) # => [[0, 0], [1, 2], [2, 4], [3, 6], [5, 5], [7, 6]]
kpf.find_path([6, 2]) # => [[0, 0], [1, 2], [2, 0], [4, 1], [6, 2]]
```
