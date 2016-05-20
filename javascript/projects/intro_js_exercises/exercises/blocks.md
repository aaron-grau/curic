# Blocks and Procs

* Implement new `Array` methods `my_each`, `my_map`, `my_select`. Do
  it by monkey-patching the `Array` class. Don't use any of the
  original versions when writing these. Use your `my_each` to define
  the others. Remember that `each`/`map`/`select` do not modify the
  original array.
* Implement a `my_inject` method. Your version shouldn't take an
  optional starting argument; just use the first element. Ruby's
  `inject` is fancy (you can write `[1, 2, 3].inject(:+)` to shorten
  up `[1, 2, 3].inject { |sum, num| sum + num }`), but do the block
  (and not the symbol) version. Again, use your `my_each` to define
  `my_inject`. Again, do not modify the original array.
* Define your own `Array#my_sort!` (you don't need `my_each`
  anymore). It should take in a block to perform the comparison:

  ```ruby
  [1, 3, 5].my_sort! { |num1, num2| num1 <=> num2 } #sort ascending
  [1, 3, 5].my_sort! { |num1, num2| num2 <=> num1 } #sort descending
  ```

  `#<=>` (the **spaceship** method)
  [compares objects][so-spaceship]. `x.<=>(y)` returns `-1` if `x` is
  less than `y`. If `x` and `y` are equal, it returns `0`. If greater,
  `1`. You can define `<=>` on your own classes.

  Your `my_sort!` should modify the array. After writing `my_sort!`,
  write a `my_sort` that does the same but doesn't modify the
  original. Do this in two lines using `dup`.