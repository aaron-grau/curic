# Jest Setup for React

Let's learn how to set up jest and run some tests!

## Installing Jest

We have taken care of the configuration for you. To install, jest run `npm install` to install all of the dependencies in your package.json.

Now you can run `npm test` in the terminal to run our jest tests! Yes, jest is a little bit slow, but there are some ways we can speed things up.

Install jest globally: `npm install -g jest-cli`

Now we can run:

* `jest --watch` - reruns the test suite every time an associated file changes, similar to `webpack --watch`
* `jest --bail` - stops running tests when we reach one that fails, similar to `rspec --fail-fast`
* `jest frontend/somepath/__tests__/sometest.js` - run a single test file 

## Commenting Out Tests

Sometimes, we don't want to run all of our tests. Luckily, it's easy to comment out single tests and blocks of test by inserting an 'x' in front of them. See the following example:

```javascript
xdescribe("a test that won't run", function () {
  it("won't run tests in this block", function () {
    expect(true).toBe(true)
  });
});

describe("a test that will", function () {
  it("will run tests in this block", function () {
    expect(true).toBe(true)
  });

  xit("wont run individual tests that have an x in front of them", function () {
    expect(true).toBe(true)
  });
});
```

You can also specifically run a single test or block of tests by inserting an 'f' for 'focused'. That is, `fdescribe` or `fit` a test.

## Debugging Jest

Yup, jests stack traces and error messages can be downright unhelpful. Luckily, there are tools we can use to make the job of debugging easier.

Install bugger to debug your tests in Chrome Devtools - this is a super helpful tool and will allow you to put debuggers and breakpoints in your code.

  * `npm install -g bugger`
  * Add the following line to your package.json under the `scripts` key:

  `"bugger": "node --harmony $(which bugger) ./node_modules/jest-cli/bin/jest.js --runInBand"`

  * Place debuggers in your tests where needed.
  * Run `npm run bugger`

This will spit out a url that you can paste into the browser like:

chrome-devtools://devtools/bundled/inspector.html?ws=127.0.0.1:8058/devtools/page/3EF9CDA0-068E-11E6-9C8A-6572CFEAB9FF

Navigate over and debug. You should be able to use chrome dev tools normally.

More info: https://github.com/buggerjs/bugger

## Directories

Jest tests live in directories named `__tests__` alongside the modules they are testing. Say we have a simple React/Flux app. Our directory structure might look a little like this:

```
frontend
└─── stores
    └─── __tests__
        └─── PostStore-test.js
    └─── PostStore.js
└─── components
    └─── __tests__
        └─── PostIndex-test.js
        └─── PostIndexItem-test.js
    └─── PostIndex.jsx
    └─── PostIndexItem.jsx
└─── etc.
```

## Config Files

We'll set up the config for you on your assessment, but in case you ever want to use jest to test your own apps, read on!

First off, make sure you have "babel-jest", "jest-cli", and
"react-addons-test-utils" in your package.json. We put these in our devDependencies since we won't need them in production. Here's the minimum that we need to get going (in addition to whatever other dependencies your app requires):

```
// package.json
    "dependencies": {
    "flux": "^2.1.1",
    "react": "~0.14.0",
    "react-dom": "~0.14.0",
    "react-router": "2.0.*"
  },
  "devDependencies": {
    "babel-core": "^6.1.4",
    "babel-jest": "^9.0.0",
    "babel-loader": "^6.1.0",
    "babel-preset-es2015": "*",
    "babel-preset-react": "*",
    "jest-cli": "^11.0.5",
    "node-loader": "^0.5.0",
    "react-addons-test-utils": "~0.14.0"
  },
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "unmockedModulePathPatterns": [
      "<rootDir>/node_modules/react",
      "<rootDir>/node_modules/react-dom",
      "<rootDir>/node_modules/react-addons-test-utils"
    ]
  }
```

Don't forget to `npm install`!

Notice that we've also added jest as a test script. Now when we run `npm test`, we will be running the jest command.

Another thing to notice is that, under the key "jest", we've specified some unmockedModulePathPatterns. Why is this? Remember, jest mocks every required module by default. We need to have the unmocked versions of react, react-dom, and react-addons-test-utils so we can actually test our components.

After your package.json file is set up, make sure you create a `babel.rc` file in the root directory of your project. This will allow the jsx and es6 in your test files to be properly transpiled when we run our tests.

```
// .babelrc
{
  "presets": ["es2015", "react"]
}

```
