# Linting for JavaScript

As you're probably discovering, JavaScript syntax can get pretty wild. Thankfully, we have _linters_ to catch syntax errors for us.

## ESLint

[ESLint][eslint-home] is a popular JavaScript linter and the one we use
here at App Academy. Its popularity stems from its power and
flexibility. As you'll soon discover, it can help you detect bugs
_before_ they occur, and it's _very_ customizable.

### ESLint in Atom

You'll find that the [`linter-eslint`][linter-eslint] Atom package has
already been installed and configured on the school computers. It hooks
into Atom's [base linter][atom-linter], which puts the yellow and red
dots in the left gutter. When the linter displays these dots, it also
puts an explanation in the status bar at the bottom of the Atom window.
Look for a message in the bottom left to see what you need to fix. Some
of these can be a little cryptic, but if you're not sure, you can always
Google it.

### Configuring ESLint

Those little dots are really useful... until you can't get rid of one.
Then they become annoying for a while until you finally just tune them
out. This, however, defeats the whole purpose of linting. To avoid
this scenario, we need to configure ESLint to deal with edge cases.

#### Globals

Global variables often cause false positives in ESLint. ESLint wants to prevent accidental global assignment, so it gets mad about anything that isn't declared with `var` `let` or `const`. The problem is that it often complains about names that are _supposed_
to be global like `window`, `navigator`, `$`, or `React`.

```js
$.ajax({  //=> ESLint Error no-undef: "$" is not defined
...
```

We can excuse these global variables from ESLint by designating them inside a `/* comment */` at the top of a file (in Node.js, this actually *makes* them global):

```js
/* globals $ */

$.ajax({  //=> no lint error
...
```

#### Other Options

Globals are not the only thing you can configure for ESLint using
comments. It turns out you can suppress (or activate) any warning using a simple comment ([docs][eslint-inline-docs]).

```js
/* eslint no-undef: 0, no-unused-vars: 1 */
```
Rule names go before the colon and 2, 1, or 0 go after: 2 for errors, 1 for warnings, and 0 to ignore completely.

ESLint is really easy to configure this way because every lint message
includes the name of the lint rule that triggered it:

```js
let unused = ':('
//=> ESLint Warning no-unused-vars "unused" is defined but never used
```

```js
/* eslint no-unused-vars: 0 */
let unused = ':)'
//=> no lint warning
```

Use comment-line configuration very sparingly, as it can cause unforeseen behavior and might even be a code smell.

#### Configuration Files

When ESLint's defaults simply don't work for a given environment, we
will want to set up a global ESLint configuration to avoid repeated false positives.

This is why we have `.eslintrc`. It's a simple JSON or YAML file that
lives at the root of your project and specifies some rules for ESLint to follow. You can also add a global `.eslintrc` in your home (a.k.a. `~/` directory. A basic `.eslintrc` might look something like this:

```yaml
---
  env:
    browser: true
    node: true
    jquery: true
  globals:
    _: false
    MyGlobalNamespace: true
  rules:
    eqeqeq: 2
    no-undef: 1
    no-unused-vars: 0
```

You can do a _lot_ more configuration, but this should be enough to get you started. [Here][eslint-rules-list] is a list of linting rules you can configure, and [here][aa-eslintrc] is App Academy's own `.eslintrc`.

[eslint-home]: http://eslint.org/
[linter-eslint]: https://atom.io/packages/linter-eslint
[atom-linter]: https://atom.io/packages/linter
[eslint-inline-docs]: http://eslint.org/docs/user-guide/configuring.html#configuring-rules
[eslint-rules-list]: http://eslint.org/docs/rules/
[aa-eslintrc]: https://github.com/appacademy/dotfiles/blob/master/dot/eslintrc
