# Exercises

* Write a method `factors` that prints out all the factors of a given
  number.
* Implement [Bubble sort][wiki-bubble-sort] in a method `#bubble_sort`
  that takes an `Array` and modifies it so that it is in sorted order.

> Bubble sort, sometimes incorrectly referred to as sinking sort, is a
> simple sorting algorithm that works by repeatedly stepping through
> the list to be sorted, comparing each pair of adjacent items and
> swapping them if they are in the wrong order. The pass through the
> list is repeated until no swaps are needed, which indicates that the
> list is sorted. The algorithm gets its name from the way smaller
> elements "bubble" to the top of the list. Because it only uses
> comparisons to operate on elements, it is a comparison
> sort. Although the algorithm is simple, most other algorithms are
> more efficient for sorting large lists.

Hint: Ruby has [parallel assignment][parallel-assignment] for easily
swapping values.

[wiki-bubble-sort]: http://en.wikipedia.org/wiki/bubble_sort
[parallel-assignment]: http://rubyquicktips.com/post/384502538/easily-swap-two-variables-values

* Write a method `substrings` that will take a `String` and return an
  array containing each of its substrings. Don't repeat substrings.
  Example output: `substrings("cat") =>
  ["c", "ca", "cat", "a", "at", "t"]`.
