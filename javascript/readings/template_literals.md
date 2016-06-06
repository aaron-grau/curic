# Template Literals

In JS template literals are strings that allow for a couple of convenient
bonus features. With Template literals you can perform string interpolation
(also known as string substitution) and define multi-line strings. Template
literals are defined using backticks.

```js
`I am a ${'template'} literal`;
```

Previously in JS, prior to ES6, to define multiline strings or add the results
of expressions, it was necessary to add strings together using the `+` operator.

```js
const when = "in the olden days"
when + " it used to be so difficult";
```

### String Interpolation in JS

```javascript
const name = 'Winnie',
      language = "JavaScript";
const myString = `Seriously, ${name} loves ${language}! ${40 + 2}`;
console.log(myString); // "Seriously, Winnie loves JavaScript! 42"
```

As we can see in the above example, the values of the variables are being
interpolated into the string that is being created with the template literal.
Expressions will also be evaluated if they are placed within the curly braces.

### Multi-line Strings

```javascript
const superLongString = `I am an example
of an extremely long string
ok maybe not that long,
but certainly longer than many other strings.
- Oscar Wilde`;
```

Template literals can also be used to easily define strings spanning multiple
lines. In Ruby, we would probably use heredocs to do this. In JavaScript, the
process without template literals is quite clunky.


### _Bonus_ Tagged Template

Putting a template literal directly after a function will trigger a function
call.

```js

function yodaSays(strings, ...values){
  console.log(strings); // ['',' loves ', '!']
  console.log(values); // ['Sarah', 'sushi']
  return `${values[1]}, ${values[0]} ${strings[1]}${strings[2]}`;
}

let name = 'Sarah', food = 'sushi';
let str = yodaSays `${name} loves ${food}`;
console.log(str) // sushi, Sarah  loves !
```

The above code is probably pretty puzzling. `yodaSays` is going to be invoked on the line where we assign the `str` variable, because JavaScript will invoke a function if a template literal is directly after it.

The really interesting part is the arguments passed to `yodaSays`. Instead of passing the entire `Sarah loves sushi!` string as an argument, the string is split into substrings (split on the curly brace delimiters) and the substrings are passed as an array into the first argument of the function. Note that when an interpolated value starts or ends a template string, an empty string is added in front of or behind it.

 The interpolated values are passed as the remaining arguments, where we use the rest operator `...values` to capture them into a second array. We can then rearrange the string however we like using our `strings` and `values` arguments.

 A more real-world example might use template literal taggings to rearrange the markup of an HTML string.

For more info, check out [this resource][mdn-literals].

[mdn-literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals


* multiline

Bonus
* tagged template literal
