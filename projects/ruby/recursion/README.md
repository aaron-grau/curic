## Recursion Questions

Estimated time: 5hrs

### Warmup

* Write a recursive method, `range`, that takes a start and an end and
  returns an array of all numbers between. If `end < start`, you can
  return the empty array.
* Write both a recursive and iterative version of sum of an array.

### Exponentiation

Write two versions of exponent that use two different recursions:

```
# this is math, not Ruby methods.

# recursion 1
exp(b, 0) = 1
exp(b, n) = b * exp(b, n - 1)

# recursion 2
exp(b, 0) = 1
exp(b, 1) = b
exp(b, n) = exp(b, n / 2) ** 2             [for even n]
exp(b, n) = b * (exp(b, (n - 1) / 2) ** 2) [for odd n]
```

Note that for recursion 2, you will need to square the results of
`exp(b, n / 2)` and `(exp(b, (n - 1) / 2)`. Remember that you don't
need to do anything special to square a number, just calculate the
value and multiply it by itself. **So don't cheat and use
exponentiation in your solution**.

**Suggestion**: [Break the methods down into parts][Break things down into
parts].

**Suggestion 2**: After breaking into parts, try walking through your code with
[Simple Examples][Simple Examples].

If the `n == 256`, about how many nested recursive steps will we run
in the first case?

How deep will we need to recurse for the second? Keep in mind that the
first reduces the exponent by one for each recursion, while the second
reduces it by half.



In addition to testing out those methods by running the code, try the following
exercise:

On paper, write out what the variables are at each step in the code, line by
line:
1.  Write out what happens with base 0 and power 0 as inputs (should be easy).
    E.g., if you had run `exp(0,0)`.
2.  Write out what happens for base 0 and power 1 (I swear there's a point).
    E.g., if you had run `exp(0,1)`.
3.  Write out what happens for base 1 and power 0.
4.  Write out what happens for base 1 and power 1.
5.  Write out what happens for base 1 and power 2.
6.  Write out what happens for base 2 and power 0.
7.  Write out what happens for base 2 and power 1.
8.  Write out what happens for base 2 and power 2.

Make sure you can trace from the very beginning to the very end in these
examples.

How many examples do you need to walk through to be confident that it works?

[Break things down into parts]: ./breaking-into-parts.md
[Simple Examples]: ../w1d2/testing-small.md

### Deep dup

The `#dup` method doesn't make a **deep copy**:

```ruby
robot_parts = [
  ["nuts", "bolts", "washers"],
  ["capacitors", "resistors", "inductors"]
]

robot_parts_copy = robot_parts.dup

# shouldn't modify robot_parts
robot_parts_copy[1] << "LEDs"
# wtf?
robot_parts[1] # => ["capacitors", "resistors", "inductors", "LEDs"]
```

When we `dup` an `Array`, it creates a new array to hold the elements,
but doesn't recursively `dup` any arrays contained therein. So the
`dup` method creates one new array, but just copies over references to
the original interior arrays.

Sometimes you want a shallow dup and sometimes you want a deep
dup. Ruby keeps things simple by giving you shallow dup, and letting you
write deep dup yourself.

**Using recursion and the `is_a?` method, write an `Array#deep_dup`
method that will perform a "deep" duplication of the interior
arrays.**

**Note:** For simplicity's sake, we are only going to ensure the deep
duplication of arrays. Don't worry about deep-duping (or regular-duping)
other types of mutable objects (like strings, hashes, instances of
custom classes, etc.), since this would require that we implement a deep
dup method for each of those classes, as well.

It's okay to iterate over array elements using the normal `each` for
this one. :-)

**You should be able to handle "mixed" arrays**. For instance:
`[1, [2], [3, [4]]]`.

### Fibonacci

Write a recursive and an iterative Fibonacci method. The method should
take in an integer `n` and return the first `n` Fibonacci numbers **in
an array**.

You shouldn't have to pass any arrays between methods; you should be
able to do this just passing a single argument for the number of
Fibonacci numbers requested.

### Binary Search

The binary search algorithm begins by comparing the target value to the value of
the middle element of the sorted array. If the target value is equal to the
middle element's value, then the position is returned and the search is
finished. If the target value is less than the middle element's value, then the
search continues on the lower half of the array; or if the target value is
greater than the middle element's value, then the search continues on the upper
half of the array. This process continues, eliminating half of the elements, and
comparing the target value to the value of the middle element of the remaining
elements - until the target value is either found (and its associated element
position is returned), or until the entire array has been searched (and "not
found" is returned).

Write a recursive [binary search][wiki-binary-search]: `bsearch(array,
target)`. **Note that binary search only works on sorted
arrays**. Make sure to return the location of the found object (or
`nil` if not found!). Hint: you will probably want to use subarrays.

This your first problem which is half a PITA to solve iteratively.

Make sure that these test cases are working:

```rb
bsearch([1, 2, 3], 1) # => 0
bsearch([2, 3, 4, 5], 3) # => 1
bsearch([2, 4, 6, 8, 10], 6) # => 2
bsearch([1, 3, 4, 5, 9], 5) # => 3
bsearch([1, 2, 3, 4, 5, 6], 6) # => 5
bsearch([1, 2, 3, 4, 5, 6], 0) # => nil
bsearch([1, 2, 3, 4, 5, 7], 6) # => nil
```

### Merge Sort

Implement a method [`merge_sort`][wiki-merge-sort] that sorts an `Array`.
* The base cases are for arrays of length zero or one. Do not use
  a length-two array as a base case. This is unnecessary.
* You'll want to write a `merge` helper method to merge the sorted halves.
* Watch [this gif][wiki-merge-gif] to get a visual idea of how merge sort works.
  Individually, draw out on paper what a version with a smaller array of numbers
(say, four numbers instead of eight) would look like.  Then compare with your
partner.


### Array Subsets

Write a method `subsets` that will return all subsets of an array.

```ruby
subsets([]) # => [[]]
subsets([1]) # => [[], [1]]
subsets([1, 2]) # => [[], [1], [2], [1, 2]]
subsets([1, 2, 3])
# => [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```

You can implement this as an Array method if you prefer.

**Hint**: For `subsets([1, 2, 3])`, there are two kinds of subsets:

* Those that do not contain `3` (all of these are subsets of
  `[1, 2]`).
* For every subset that does not contain `3`, there is also a
  corresponding subset that is the same, except it also **does**
  contain `3`.

[wiki-binary-search]: http://en.wikipedia.org/wiki/Binary_search
[wiki-merge-sort]: http://en.wikipedia.org/wiki/Merge_sort
[wiki-merge-gif]:
https://en.wikipedia.org/wiki/Merge_sort#/media/File:Merge-sort-example-300px.gif

### Make Change

RubyQuiz: [Make change][make-change-mirror]. **Make sure your solution
works for `make_change(14, [10, 7, 1])`**. The correct answer is
`[7, 7]`, not `[10, 1, 1, 1, 1]`.

Here's a game plan for solving the problem:

First, do the traditional American money thing: take as many of the
biggest coin as you can. Then do a recursion on the remaining amount,
leaving out the biggest kind of coin.

Next, instead of taking as many of the biggest you can, instead use
only one of the biggest you can. When you make your recursive call for
the remaining amount, leave out the biggest kind of coin **only if
you couldn't use any of them**. Note that this doesn't fix anything;
it just makes you give out coins of a given type one-by-one.

Lastly, change your program so that it doesn't lock itself into using
the biggest possible coin. In each call to `make_change`, iterate
through the possible coins; first take one of the biggest, and then
make a recursive call on the remaining amount. Record this way of
making change. But don't stop yet; next, take one of the
second-biggest coin, and try to make change for the remainder. If this
uses fewer coins than the previous solution, replace your "current
best" solution. Don't stop until you iterate through all the coins.

The trick is that each level of recursion should be trying out all the
coins. Like in the `make_change(14, [10, 7, 1])` case, you can't
assume that you'll use the 10 cent piece.

**This problem is harder than the others. Check with your TA to verify
your solution**. You'll probably be wrong the first time :-)

[make-change-mirror]:
http://web.archive.org/web/20130215052843/http://rubyquiz.com/quiz154.html

## Resources

* [Wikipedia: Recursion][wiki-recursion]

[wiki-recursion]: http://en.wikipedia.org/wiki/Recursion_(computer_science)

