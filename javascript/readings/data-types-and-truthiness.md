## JavaScript Data Types

Before we start manipulating data, we first have to know what kinds of data we can manipulate. JavaScript provides 5 primitive data types for us:

* Numbers
* String (text)
* Boolean
* Undefined
* Null

## NaN

`NaN` stands for "not a number". This is the result of any illegal numerical operations. Run the code below in your `node` console:

```javascript
> 20 * "happy"
NaN
```

## Falsey vs Truthy

In Ruby, the only falsey values are `nil` and `false`.

```ruby
if 0
  puts 'In Ruby, this will print'
end

```

In Javascript, zeros, empty strings, `undefined`, `null`, and `NaN` are all considered falsey values. Everything else is true.

```javascript
if (0 || "" || undefined || null || NaN) {
  console.log('In JavaScript, this will not print.')
}

```
Take care when writing conditional statements in JavaScript! Try testing out conditionals with the other falsey values in Node.
