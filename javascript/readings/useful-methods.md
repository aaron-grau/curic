# Useful Javascript Methods

You'll notice that many of these operators are very similar to Ruby! Give them a try in Node.

## `console.log`

This is similar to `puts` in Ruby.

```javascript
> console.log('hello')
hello
```

## comments

```javascript
// this is a javascript comment
```

## Mathematical Operators

* `+`
* `-`
* `*`
* `/`
* `%`

## Comparison Operators

* `>`
* `<`
* `>=`
* `<=`
* `===`
* `!==`

__NB:__ Three equals signs? What's that about? There is a double equals operator (`==`)
in JS as well, but we'll mostly be sticking with `===`. The double equals sign does some
type conversion which can lead to confusing results. Learn more about it in *Effective Javascript*.

## Logical Operators

* `&&`: and
* `||`: or
* `!`: not

## String Methods

* `String.prototype.toLowerCase`
* `String.prototype.toUpperCase`
* `String.prototype.indexOf`
* `+`: concatenation

*We will talk about this `prototype` later, but for now just know that a class' methods are defined on it.*

## Array Properties

* `Array.prototype.length`

## Array Methods

* `Array#pop` ex. [1,2,3].pop() //=> 3
* `Array#push` ex. [3,2,4].push(1) //=> 4 (length of array)
* `Array#shift` ex. [1,2,3].shift() //=> 1
* `Array#unshift` ex. [1,2,3].unshift(1) //=> 4 (length of array)
* `Array#indexOf`: similar to `Array#index` in Ruby, but returns -1 when it does not find an item.
* `[]`: bracket notation similar to Ruby.
* `Array#slice([start, [end]])`: Makes a copy of an array from the start index up to but not including the end index. Both arguments are optional (the first and last elements are used by default).
