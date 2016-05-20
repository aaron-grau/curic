# Array Exercises

Estimated time: 2hrs

### Remove duplicates

Array has a `uniq` method that removes duplicates from an array. It
returns the unique elements in the order in which they first appeared:

```ruby
[1, 2, 1, 3, 3].uniq # => [1, 2, 3]
```

Write your own `uniq` method, called `my_uniq`; it should take in an
Array and return a new array.

One special feature of Ruby classes is that they are *open*; we can add
new methods to existing classes. Take the `my_uniq` method that you just
wrote and modify it slightly so that it can be called directly on an
array:

```ruby
class Array
  def my_uniq
    # ...
  end
end
```

This is called *monkey patching*.

### Two sum

Write a new `Array#two_sum` method that finds all pairs of
positions where the elements at those positions sum to zero.

NB: ordering matters. I want each of the pairs to be sorted
smaller index before bigger index. I want the array of pairs to be
sorted "dictionary-wise":

```ruby
[-1, 0, 2, -2, 1].two_sum # => [[0, 4], [2, 3]]
```

* `[0, 2]` before `[1, 2]` (smaller first elements come first)
* `[0, 1]` before `[0, 2]` (then smaller second elements come first)

### My Transpose

To represent a *matrix*, or two-dimensional grid of numbers, we can
write an array containing arrays which represent rows:

```ruby
rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]

row1 = rows[0]
row2 = rows[1]
row3 = rows[2]
```

We could equivalently have stored the matrix as an array of
columns:

```ruby
cols = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]
```

Write a method, `my_transpose`, which will convert between the
row-oriented and column-oriented representations. You may assume
square matrices for simplicity's sake. Usage will look like the following:

```ruby
my_transpose([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ])
 # => [[0, 3, 6],
 #    [1, 4, 7],
 #    [2, 5, 8]]
```

### Stock Picker

Write a method that takes an array of stock prices (prices on days 0,
1, ...), and outputs the most profitable pair of days on which to
first buy the stock and then sell the stock.

### Towers of Hanoi

Write a
[Towers of Hanoi](http://en.wikipedia.org/wiki/Towers_of_hanoi) game.

Keep three arrays, which represents the piles of discs. Pick a
representation of the discs to store in the arrays; maybe just a number
representing their size. Don't worry too much about making the user
interface pretty.

In a loop, prompt the user (using
[gets](http://andreacfm.com/2011/06/11/learning-ruby-gets-and-chomp/))
and ask what pile to select a disc from, and where to put it.

After each move, check to see if they have succeeded in moving all the
discs, to the final pile. If so, they win!

## Resources

* [Ruby Doc on Array](http://www.ruby-doc.org/core-2.1.2/Array.html)
* [Ruby Array Article](http://zetcode.com/lang/rubytutorial/arrays/)