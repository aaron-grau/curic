### Jumpstart

Quick reference for getting up and running with heroku:

```ruby
# config/environments/production.rb
config.serve_static_files = true
# ...
config.log_level = :debug
```

```ruby
# Gemfile
group :production do
  gem 'newrelic_rpm'  
  gem 'rails_12factor' # error feedback
end
```

```js
// package.json
"engines": {
  // Your versions of node and npm should go here
  // Check this by running the `node -v` and `npm -v` commands in the root of your project
  "node": "4.1.1",
  "npm": "2.1.x"
},

"scripts": {
  "postinstall": "./node_modules/.bin/webpack"
},
```

```sh
heroku apps:create myfullstackprojectapp
heroku buildpacks:set heroku/ruby
heroku buildpacks:add --index 1 heroku/nodejs
git add -A
git commit -m "update production.rb for assets on heroku"
git push heroku master
```

[npm-instructions]: ./heroku-deployment.md

# Deploying Your App to Heroku

Heroku is a hosting service which will run a Rails web application and
make it accessible to users across the internet. This is in contrast
to running a local development server, which is not accessible to the
wider internet. Heroku is free to start using.

Most of this demo is based on the
[Heroku Rails Documentation][heroku-rails-docs].

A note before you start: **NEVER RUN** `rake
assets:precompile` [(here's why)][asset-rails-doc]. Heroku is supposed
to do this for you; check our troubleshoot if Heroku fails to compile your assets.

[heroku-rails-docs]: https://devcenter.heroku.com/articles/rails3
[asset-rails-doc]: http://guides.rubyonrails.org/asset_pipeline.html#precompiling-assets

### Setup Postgres for Development

Heroku uses Postgres. You should set up your `database.yml` so that
Postgres is used in development (add `gem 'pg'` to the
`Gemfile`); this way your development and production environments will
be similar. You may delete the production section of `database.yml`;
Heroku ignores `database.yml`.

### Setup a Heroku Account and Create App

Make a [Heroku][heroku] account if you don't already have one.

Install the heroku toolbelt, which will provide you the command-line
`heroku` program. You can do this one of two ways: (a) using Homebrew
(`brew install heroku`), or (b) download [the DMG][toolbelt-dmg]
and install it.

Go to your [Heroku dashboard][heroku-dashboard] and create a new app:
you can choose a name for your app. The URL will be of the form
`name.herokuapp.com`.

[heroku]: https://www.heroku.com/
[toolbelt-dmg]: https://toolbelt.heroku.com/
[heroku-dashboard]: https://dashboard.heroku.com/apps

### Setup SSH with Heroku

By this time, you should already have
[setup an SSH key][generate-ssh-key] to use with Github.

Just like we gave Github our `~/.ssh/id_rsa.pub` file, we need to do
the same with Heroku. This **public key** is what Heroku uses to make
sure we are are who we say we are and that we are authorized to push
to Heroku. This is in lieu of traditional username/password
authentication.

To add your key, login to [Heroku][heroku] and go to your user settings
(click the top-right image; then "Account"). There is a box where you
can upload a public key. To copy your key into the clipboard, run
`cat ~/.ssh/id_rsa.pub | pbcopy` in the command line. Now paste it into the SSH Keys box and
click "Add Key".

[generate-ssh-key]: https://help.github.com/articles/generating-ssh-keys

Link your repo to heroku with `heroku git:remote --app your_app_name`.
This will add a `heroku` git remote where you can push to deploy.
If you're not sure what your app name is, use `heroku apps` to find it.


### Internal Server Errors

Heroku's logs are great, but by default they don't give us the nice
error feedback we're used to from the Rails server logs. Luckily, there
are ways to get this information.

Install the `rails_12factor` gem (add it to your `Gemfile` under `production`).
Set your application's `log_level` to `debug`. You can
set this manually in `production.rb`.

An alternative is to install New Relic and use its error recording
and reporting console. First, make sure you've added New Relic to your
app (add `newrelic_rpm` to your `Gemfile` under `production`). Go to the New Relic dashboard (as described below), and in the side
bar you'll find an **Errors** listing under the Events heading. This
should show you the errors raised by your app in the last 30 minutes.
Congratulations, you've earned the power of error messages!  Now go
forth and squash bugs.

### Configure Heroku to Use Both NPM and RubyGems

Heroku uses something called a [buildpack][heroku-buildpacks] to
compile your application once it gets pushed up to your Heroku remote.
Heroku can be used to host applications built on a variety of technologies;
it uses the presence of certain files in your directory to determine
which buildpack it needs to run. If it detects a Gemfile, it knows you
have a ruby app and will run `bundle install`. If you have a `package.json`
file, it knows you are running a node application and will run
`npm install` when compiling your application. The problem comes when
we have both -- it won't use more than one buildpack by default, meaning
either our gems won't be installed, or our `node_modules` will be missing
and our files won't be bundled.

We can solve this problem by telling Heroku to use multiple buildpacks.
Heroku's instructions on this are [here][multi-bp-link]. Two main steps are
required:
  * Run `heroku buildpacks:set heroku/ruby`
  * Run `heroku buildpacks:add --index 1 heroku/nodejs`

In addition to setting the buildpacks, we need to specify node and npm versions
in our `package.json`. This is done under an `engines` key:

```js
"engines": {
 // Your versions of node and npm should go here
  // Check this by running the `node -v` and `npm -v` commands in the root of your project
  "node": "4.1.1",
  "npm": "2.1.x"
},
```

Heroku will now run `npm install` in addition to `bundle install` when we push
our application to the remote. Again, this is important because (assuming we are
following our [npm and git guidelines][npm-git-reading]) we won't have pushed up
our `node_modules` folder or `bundle.js` file to the remote.

In order for this to work, you need to ensure you have both webpack and
all babel-related packages installed as regular dependencies, not `devD
dependencies` in your package.json.

Last, we still need to run `webpack` once on our production server in order to
generate our `bundle.js` file. We can do this by setting up a `postinstall` npm
script. In your `package.json`, change your `scripts` property to the
following:

```js
"scripts": {
  "postinstall": "./node_modules/.bin/webpack"
},
```

This will run automatically after `npm install` finishes.

**NB:** Make sure you resolve any npm peer dependency issues before you push
to Heroku, or Heroku will complain and your build may fail.

[heroku-buildpacks]: https://devcenter.heroku.com/articles/buildpacks
[multi-bp-link]: https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app
[npm-git-reading]: https://github.com/appacademy/curriculum/blob/master/react/readings/git_and_npm.md

### Push Your Code

In the command line; go to your project directory. We deploy to Heroku
by pushing our Git repository to Heroku. Make sure you've already
[linked your app to Heroku](#setup-ssh-with-heroku).

Deploy your code to Heroku by pushing to the Heroku Git repository:
`git push heroku master`. In response to your code push, Heroku will
install all the gems, compile assets, and start up a web-server.

You should now be able to visit the application. Check out `heroku
open`.

**NB:** If you have any node packages, you will need to
follow the instructions in the previous section before your JS application
will load.

### Set Up Your Database

With your app's code on Heroku, it's now time to get your database
set up on Heroku. Run the following to execute your migrations:

```bash
heroku run rake db:migrate
```

If you have seed data, you can run:

```bash
heroku run rake db:seed
```

If you're running into problems with this, try installing the add-on for `heroku-postgres` via the Heroku dashboard.

### Get a Domain Name

**NB:** You don't have to do this right away, but you should take
care of it eventually so your app looks more legit.

We recommend [namecheap.com][namecheap] for registering domains. GoDaddy is often a little cheaper, but historically has not worked out as
well for students.

[namecheap]: http://www.namecheap.com/

#### Setting up a CNAME

Canonical names make your hostname point to another. For example, want
`www.mycoolurl.com` to point to `www.myuncoolurl.herokuapp.com`.

*On namecheap.com:*

0. Log in.
0. Click on the "Domain List" tab in the left-side toolbar
0. You should see your domain listed.  Click the "Manage" button on the far-right side.
0. Click on "Advanced DNS" in the toolbar
0. In the host records section, edit the "CName Record" row:
    * Set the host to `www`
    * Set the value to `myuncoolurl.herokuapp.com.` (no http or trailing slash!)
    * Set the [TTL][ttl] to 60 min
0. Make sure all your changes are saved.

[ttl]: https://en.wikipedia.org/wiki/Time_to_live

*In your terminal*

0. Navigate to the directory that holds your project's repo.
0. Run "heroku domains:add www.mycoolurl.com".

More detailed instructions:
+ [Namecheap Setup][namecheap-tutorial]
+ [Heroku Setup][heroku-tutorial]

[heroku-tutorial]: https://devcenter.heroku.com/articles/custom-domains
[namecheap-tutorial]: http://www.namecheap.com/support/knowledgebase/article.aspx/1031/2/

**N.B.** The redirect will likely not be immediate.  Please wait at least a half hour before calling over a TA if the redirect is not working.  

# Troubleshooting

### Logging and `heroku run`

You're used to using the server log for debugging purposes. If you
want to view your server log, you can run `heroku logs` from the
command line. Since `heroku logs` only shows the recent logs and then
quits, it is often convenient to run `heroku logs -t`. The `-t` puts
you into **tail** mode; instead of quitting, we'll wait for more and
more logs to print. Logs are your main debugging tool.

The most common heroku command is `heroku run ____`. This will run a
command on the Heroku server as if it were on your own machine. For
instance:

* `heroku run rake db:migrate`

**Other Useful Commands**

* Open up your Rails console: `heroku run rails c`
* Remove all data from your database: `heroku pg:reset name_of_your_db`
  * `rake db:reset` or `rake db:drop` won't work on Heroku because you don't
    have permission to drop and create databases.
  * To find the name of your database, go to your app's page on your
    Heroku account, click on "Heroku Postgres" under "Add-ons", and use
    the name after the `::` following your app's name.

### Asset Precompilation Error

If `rake assets:precompile` fails with an ExecJS error when you push to
heroku. it's probably because you're using some ES6 syntax. Uglifier sometimes
has issues with ES6.

**Fix #1**

1. `npm install --save babel-preset-es2015`
2. Add `es2015` to `webpack.config.js` at `module.loaders.query.presets`

**Fix #2** (if #1 doesn't work)

In `production.rb`, comment out the line:
```ruby
config.assets.js_compressor = :uglifier
```

### Assets Not Found

If your assets are precompiling successfully but still returning `404 not found` in deployment, you may need to set `config.assets.compile = true` in your `production.rb` file.

### Page not found errors?

Make sure you've migrated your database and that all the appropriate
routes, controllers, and views are in place.

### Site looks outdated, even after a push?

You probably precompiled your assets locally before pushing to heroku.
Remove the `public/assets` folder under your Rails app directory.

### No assets?

If you're getting 404 errors for all your assets, make sure that you
have these settings in your `production.rb`:

```ruby
  # config/environments/production.rb
  config.serve_static_files = true
```

# Pingdom/NewRelic

To save time/money, Heroku will put its servers to sleep if your site
isn't accessed every five minutes. If your site application server is
asleep, your page will take a long, long time to load on the next
request because Heroku has to wake it up.

This sucks for you because recruiters will visit your website and they
will get bored.

To keep your servers awake, you want to make sure your site is
accessed at least once every five minutes. That way your server is
never put to sleep.

To do this, use [pingdom][pingdom] or the [newrelic][newrelic]
addon. They can be configured to constantly make requests to your
site. These additionally give you the benefit of sending you emails if
your site goes down (that's what they're actually intended for).

[pingdom]: https://www.pingdom.com/free/
[newrelic]: https://addons.heroku.com/newrelic

**To set up availability monitoring in New Relic:**

Go to the Heroku dashboard, open your app's page, and click on "New Relic APM"
under Resources. From the New Relic Dashboard, click your app's name. There
should now be a side bar on the left-hand side of the window. In the side bar,
click on "Availability Monitoring" under "Settings". Enter your app's URL,
save your changes, and you should be good to go.
