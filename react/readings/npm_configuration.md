# Node Package Manager (NPM)

You're likely already somewhat familiar with Node Package Manager and how it can
be used to install JavaScript dependencies called **node modules** for your app
(e.g. `npm install webpack -g`).

This reading will cover the configuration process for automating node module
installation for apps that have several dependencies.

## Generating `package.json` with `npm init`

Much like Ruby's `Gemfile`, npm can be used with a manifest file that lists all
of an app's JavaScript dependencies. This file is called `package.json`. While
you can write this file by hand, npm's CLI (command line interface) simplifies
the process a lot.

To initialize an app with npm, run this in the directory of the app:

```
npm init --yes
```

This creates a `package.json` file using default boilerplate from the `--yes`
flag. It should look something like this:

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Don't worry about the default settings above; they won't affect how your app
runs, and you can always adjust them later.

## Installing Packages

Once you've generated a `package.json`, you can start installing npm packages 
such as `react` and `redux` via the command line:

```
npm install <package_name>
```

This will look up a package by its name and automatically download it into a
folder in your app called `node_modules`, kind of like `gem install <gem>`.
However, it doesn't make any record of the installation, so if someone clones
your app, or if you try to run it on a different computer (say, your production
server), the package will be missing!

Adding the `--save` flag to your `npm install` command will install the package
*and* list it in your `package.json`:

```
npm install --save <package_name>
```

Thus, running the following command:
```
npm install --save react redux
```

adds the following to your app's `package.json`:
```json
"dependencies": {
  "react": "^15.3.0",
  "redux": "^3.5.2"
},
```

Note: You can use the `--save-dev` flag instead to specify packages for the
development environment only if you are using different packages for your
development and production server.

Now, anyone who gets a copy of your app can download all your dependencies in
one fell swoop by running the following (with no arguments):

```
npm install
```

## Add a Webpack Script

Recall that, in Ruby, running `bundle exec some_command` is **not the same** as
running `some_command`. In the former, the `Gemfile`-specified version of
`some_command` is run, while in the latter, the local version is run. Omitting
`bundle exec` when running commands can cause errors if our app isn't compatible
with the local version.

To solve this issue with NPM packages, we need to add `"scripts"` for any packages
that we intend to call from the command line. Once we've added a script for a 
package, we can use:

```
npm run <package_name>
```

to ensure that we run the `package.json` specified version.

To create a `webpack` script, add the following attribute to your `package.json`:

```json
"scripts": {
  "webpack": "webpack"
},
```

Now, when you run `npm run webpack` in the terminal, the
`package.json`-specified version will run.

**NB**: Always run `npm run webpack` rather than `webpack` to minimize the
chance of compatibility issues.

# Summary

- `npm init --yes` - Creates your app's `package.json`.
- `npm install --save <package_name>` - Installs and lists a package as a dependency in `package.json`.
- `npm install` - Downloads all JavaScript dependencies listed in `package.json`.
- Add a `webpack` script to enable `npm run webpack`.
