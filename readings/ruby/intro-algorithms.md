# Intro to Algorithms and Data Structures

## Goals

* Know what an algorithm is.
* Know what a data structure is.
* Know what a tree is.
* Know what DFS and BFS are

This class won't focus heavily on abstract algorithms: we will not
become experts in every algorithm under the sun. We are going to cover
the basic algorithms that *will* prove useful in your career.

Coding up algorithms is a good way to practice the skills we've been
learning. It gives you practice thinking like a programmer. Given a
description of an algorithm, you should be able to translate it into
Ruby code. That's our primary goal in this chapter.

## Trees

Ruby provides an Array class which is a "linear" collection of
elements. But there are other ways to represent collections and
organize data.

[**Trees**][trees] store data in a *hierarchy* of layers. An element,
or **node** at each layer can have links to lower level nodes. One
simple example is a file system:

[trees]: http://en.wikipedia.org/wiki/Tree_data_structure

* /
    * Users
        * ruggeri
            * Desktop
            * Documents
            * Downloads
        * patel
            * Desktop
            * Downloads
    * System
        * Library

The top-level node is called the **root**. Each node can hold a value:
here the root holds `/`. The **children** of a node are the nodes one
level deeper. The children of the `Users` node hold `ruggeri` and
`patel`. The lowest level nodes (the ones with no children) are called
**leaves**.

In general, nodes can have any number of children. In the special case
of **binary trees**, nodes can have at most two children. These
children are called the **left** and **right** children.

An array and a tree are two kinds of **data structures**. A data
structure is a way of storing and organizing data in a computer so
that it can be used efficiently. Depending on how you will use the
data, different data structures may be appropriate.

## Depth First Search ([DFS][dfs])

Given a tree, we may wish to enumerate all the values held by nodes in
the tree. For instance, we may wish to go through the files/folders of
the tree and print each one.

One common way to traverse (i.e., visit all the nodes) a tree is depth
first search. The nodes are numbered in the order that we visit them:

          1
         / \
        2   5
       /   / \
      3   6   9
     /   / \
    4   7   8

Each time, we try to visit the left child, if it exists and hasn't
been visited yet. If it has, we try to visit the right child, if it
exists and hasn't been visited yet. If all the children have been
visited, then we move up one level and repeat.

Watch [this animation][dfs-gif] to see the order that you want to
visit nodes in the tree.

[dfs-gif]: https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif

## Breadth first search ([BFS][bfs])

Breadth first search is an alternative to depth-first search.

          1
         / \
        2   3
       /   / \
      4   5   6
     /   / \
    7   8   9

Here we visit a node, then each of its children, then each of their
children, etc.  Watch [this animation][bfs-gif] to see the order that you want to
visit nodes in the tree.

An advantage of breadth-first search is that it considers shallower
nodes before deeper ones.

[dfs]: http://en.wikipedia.org/wiki/Depth-first_search
[bfs]: http://en.wikipedia.org/wiki/Breadth-first_search
[bfs-gif]: http://www.how2examples.com/artificial-intelligence/images/Breadth-First-Search.gif

## Algorithm

DFS and BFS are **algorithms**. What's the difference between an
algorithm and a method? An algorithm is an idea, an unambiguous but
unrealized process that solves a problem and which potentially could
be written in any language. A method is the **implementation**, a
conversion of an algorithm into Ruby code which can then be run.

An algorithm can be coded up in any langauge.

## Exercises

Estimated time: 2hrs

Before you begin, read [this reading][overriding_inspect] on inspecting
complex objects.

[overriding_inspect]: ./overriding_inspect.md

### Implement a TreeNode class

Write a class named `PolyTreeNode` which represents a node in a
tree. We'll write a tree node class that can have an arbitrary number
of children (not just two left/right children). It should have the
following interface:

**Phase I:**

* Write a class with four methods:
    * An `#initialize(value)` method that sets the value, and starts
      `parent` as nil, and `children` to an empty array.
    * A `#parent` method that returns the node's parent.
    * A `#children` method that returns an array of children of a
      node.
    * A `#value` method that returns the value stored at the node.
* Write a `parent=` method which (1) sets the parent property and (2)
  adds the node to their parent's array of children (unless we're
  setting parent to `nil`).

Test your code out with [this RSpec directory][tree-node-rspec]. Run
`bundle exec rspec` to run the tests.

**Phase II:**

Your `parent=` code likely leaves a mess when re-assigning a
parent. Here's what I mean:

```ruby
n1 = PolyTreeNode.new("root1")
n2 = PolyTreeNode.new("root2")
n3 = PolyTreeNode.new("root3")

# connect n3 to n1
n3.parent = n1
# connect n3 to n2
n3.parent = n2

# this should work
raise "Bad parent=!" unless n3.parent == n2
raise "Bad parent=!" unless n2.children == [n3]

# this probably doesn't
raise "Bad parent=!" unless n1.children == []
```

In addition to (1) re-assigning the parent attribute of the child and
(2) adding it to the new parent's array of children, we should also
**remove** the child from the **old** parent's list of children (if
the old parent isn't `nil`). Modify your `parent=` method to do this.

**Make sure all the parent= specs pass before proceeding!**

**Phase III:**

The easiest phase! Write `add_child(child_node)` and
`remove_child(child)` methods. These methods should be one- or two-liners that
call `#parent=`.

**Phase IV:**

* Write a `#dfs(target_value)` method which takes a value to search for and
  performs the search. Write this recursively.
    * First, check the value at this node. If a node's value matches
      the target value, return the node.
    * If not, iterate through the `#children` and repeat.
* Write a `#bfs(target_value)` method to implement breadth first search.
    * You will use a local `Array` variable as a queue to implement
      this.
    * First, insert the current node (`self`) into the queue.
    * Then, in a loop that runs until the array is empty:
        * Remove the first node from the queue,
        * Check its value,
        * Push the node's children to the end of the array.
* Prove to yourself that this will check the nodes in the right
  order. Draw it out. **Show this explanation to your TA.**
* Get your TA to check your work!
* Make sure **all** the specs pass.

## References

* Wikipedia: [Data structure][wiki-data-structure]
* Wikipedia: [Algorithm][wiki-algorithm]

[wiki-data-structure]: http://en.wikipedia.org/wiki/Data_structure
[wiki-algorithm]: http://en.wikipedia.org/wiki/Algorithm
[tree-node-rspec]: https://github.com/appacademy/solutions/blob/master/w1/w1d5/00_tree_node_blank.zip
