# Linting JavaScript

As you're probably discovering, JavaScript code can get pretty wacky and
wild. The fact that there's a really popular book entitled _JavaScript:
The Good Parts_ would seem to imply that there are also bad parts. (Oh
boy, are there bad parts!)

It would be very nice if we had a tool that helped us avoid these many
pits strewn about the JavaScript landscape. As you would expect anywhere
programmers encounter a consistent annoyance, such tools exist. They're
referred to as _linters_, so called because they point out the _"lint"_
on the otherwise desirable fabric of your codebase so that you can
remove it.

## ESLint

[ESLint][eslint-home] is a popular JavaScript linter and the one we use
here at App Academy. Its popularity stems from its power and
flexibility. As you'll soon discover, it can help you detect bugs
_before_ they occur, and it's _very_ customizable.

### ESLint in Atom

You'll find that the [`linter-eslint` Atom package][linter-eslint] has
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
out. This, ironically, defeats the whole purpose of linting. To avoid
this scenario, we need to be sure our linter can deal with all the
edge-cases that inevitably come up when coding, which is why ESLint is
so configurable.

#### Globals

A very common case for ESLint false-positives has to do with global
variables. ESLint wants to be sure we don't go defining and referencing
global variables by accident, so if we use anything that isn't declared
with `var`, it smells a rat.

The problem is that it often complains about names that are _supposed_
to be global like `window`, `navigator`, `$`, or `React`.

```js
$.ajax({  //=> ESLint Error no-undef: "$" is not defined
...
```

We can excuse these by designating global variables inside a `/* comment */`
at the top of a file (in Node.js, this actually makes them global):

```js
/* globals $ */

$.ajax({  //=> no lint error
  ...
```

#### Other Options

Globals are not the only thing you can configure for ESLint using
comments. It turns out you can suppress (or activate) any warning using
a simple comment ([docs][eslint-inline-docs]).

```js
/* eslint no-undef: 0, no-unused-vars: 1 */
```

Rule names go before the colon and 2, 1, or 0 go after: 2 for errors, 1
for warnings, and 0 to ignore completely.

ESLint is really easy to configure this way because every lint message
includes the name of the lint rule that triggered it:

```js
var unused = ':('
//=> ESLint Warning no-unused-vars "unused" is defined but never used
```

```js
/* eslint no-unused-vars: 0 */
var unused = ':)'
//=> no lint warning
```

Problem solved :D ... or at least ignored :\

If configuring your linter using comments seems weird to you, then your
feelings serve you well. It _is_ weird, and it _is_ to be avoided.
However, you occasionally need it for that rare exception to the rules
where the code just _has_ to do this one thing that ESLint doesn't like
even though under normal circumstances it "_never does this_" and is
"_not that kind of source code_".

#### Configuration Files

Often times though, the defaults just don't fit our project or company
practices, or ESLint doesn't factor in some important aspect of our
environment. This will result in consistent false-positives unless we
have a way to do global ESLint configuration.

This is why we have `.eslintrc`. It's a simple JSON or YAML file that
lives at the root of your project and specifies some rules for ESLint to
follow. You can also add a global `.eslintrc` in your home directory. A
basic `.eslintrc` for your purposes might look something like this:

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

You can do a _lot_ more configuration, but this should be enough to get
you started. [Here][eslint-rules-list]'s a list of all the linting rules
available to you, and [here][aa-eslintrc]'s App Academy's own
`.eslintrc` that we have on the student computers.

Now you understand the great mysteries of lint. Go and enter into the
zen of clean code.

[eslint-home]: http://eslint.org/
[linter-eslint]: https://atom.io/packages/linter-eslint
[atom-linter]: https://atom.io/packages/linter
[eslint-inline-docs]: http://eslint.org/docs/user-guide/configuring.html#configuring-rules
[eslint-rules-list]: http://eslint.org/docs/rules/
[aa-eslintrc]: https://github.com/appacademy/dotfiles/blob/master/dot/eslintrc
