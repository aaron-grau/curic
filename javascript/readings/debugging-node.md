# Debugging Node.js

Debugging is a little more difficult for server-side JavaScript than for
client-side, which is one of the more frequently-voiced complaints about
Node.js. But like anything else, with a little knowledge and
determination, you can make it happen!

## Chrome Debugger

The Chrome debugger is *really, really awesome*, which is why it would
be super nice if we could still use it for Node. One strategy is to
actually import your node code and run it in a browser with a basic HTML
page like so:

```html
<html>
  <body>
    <script src="./lib1.js"></script>
    <script src="./lib2.js"></script>
  </body>
</html>
```

Open the Chrome dev tools and click on the sources tab. You can look at
the JS files there. Click a line number in the gutter (the row number to
the left of the code) to add a debugging breakpoint. You can also add
breakpoints in the code with the `debugger` statement.

### The downside to Chrome

Unfortunately, this isn't really debugging *Node.js*, since the `node`
program isn't executing your code. Any node-specific functionality you
are using (like importing modules) will prevent this strategy from
working. So let's see what Node.js itself has to offer.

## Debug Mode

Node.js has a native debugger. You can run any node script in debug
mode, but it must be invoked specifically from the command line when you
run your script. See the [docs here][node-debugger]:

```bash
$ node debug my_script.js
```

**NB:** The node debugger always steps through your code starting with
the first line and moving forward. Press `c` to continue to your first
breakpoint. You can add `debugger` statements in your code or set
breakpoints manually after you start debugging.

**NB 2:** Simply letting your script run to the end will *not* terminate
the process. You must quit the debugger manually with the `quit`
statement.

## Node Inspector

Wow, compared to Chrome's debugger, Node's debugger sucks. Wouldn't it
be nice if there were some way to just use Chrome's debugger but with
Node.js?

Well funny you should ask! It turns out that StrongLoop.io (the company
that manages Node.js) has built exactly that.
[`node-inspector`][node-inspector] is like the native debugger, but it
works over TCP so you can use your browser to inspect code that's
running on your server. Talk about cool!

It's an `npm` package, so you'll have to install it:

```bash
$ npm install -g node-inspector
```

Then you can run your script with it.

```bash
$ node-debug my_script.js
```

It should automatically open up a browser window with the debugger. (Be
sure that you have Chrome set to your default browser or this won't
work.) Check out [the node-inspector docs][node-inspector] for more
info.

Still this is kind of a PITA because it takes a few seconds to load. What if there were a way we could do this more natively somehow...

## Atom is Node

So, fun fact: the Atom Text Editor is built on Node.js. Don't believe me?
Just press `⌘⌥I` in an Atom window. Whoa! it's a JavaScript
console just like in Chrome!

Because of this, we can just use the Atom environment to test our code
and debug it in the Atom console. There is an awesome `apm` package
called [run-in-atom][run-in-atom] that does just this at the press of a
hotkey. This is _super_ convenient, but there are a couple of things to
bear in mind when you do this...

### Atom isn't _exactly_ Node

Be aware though: running your code in the Atom environment may not
perfectly mimic the `node` command. That's because Atom is not built
_in_ Node.js, but _on top of_ it. The Atom runtime environment is called
[electron][electron], and it includes DOM functions alongside the Node
API, so it's like a hybrid of server and browser.

For this reason, your code may not behave _exactly_ the same. If exact
replication of behavior is important, don't use this method. This likely
won't be an issue for you here, but in dev shops with high uptime
requirements, that's a must.

**Warning:** There is a second, more grave consequence that you should
be aware of. Since we're running our code in the Atom environment, that
means it has access to Atom itself. To understand what that means, open
a **new** Atom window (not a new tab!), paste this code, set the content
type to JavaScript, and watch what happens when you _run-in-atom_...

```js
body = document.getElementsByTagName("body")[0];
body.innerHTML = "<h1>You've been Pwned!</h1>";
```

For this reason, you should **never** use `run-in-atom` to debug a
script that modifies the DOM or makes any kind of change that could
affect Atom. You have been warned.

Still, this is by far the easiest way to debug Node scripts, and as
long as you account for these differences, you should be fine.

Happy debugging!

[node-debugger]: https://nodejs.org/api/debugger.html
[node-inspector]: https://github.com/node-inspector/node-inspector/blob/master/README.md
[electron]: http://electron.atom.io/
[run-in-atom]: https://atom.io/packages/run-in-atom
