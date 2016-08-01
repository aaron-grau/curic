# Rails Setup

There are several things you **must** do when beginning every Rails
app for the near future.

First off, check your rails version. In this course, we will be
using Rails `~>4.2.0` (greater than or equal to 4.2.0 but less than
4.3). Check to see if you have a proper version by running:

```
rails -v
```

If you don't have a new enough version of Rails, run:

```
gem install rails -v '~> 4.2.0'
```

Now that you have Rails installed and ready, start your project
with the following command:

```
rails new MyProjectName --database postgresql
```

When using postgresql, you must also change the configs in
`config/database.yml` by adding `host:localhost`.

See this earlier [reading][setting-up-postgresql] for an example.

When using postgresql, you should also run the command `rake
db:create` in the terminal before trying to run migrations.  This
actually creates the database for your application.

[setting-up-postgresql]: ../../sql/readings/first-rails-project.md#postgres

## Stop the loading of unused assets

In `app/views/layouts/application.html.erb`, remove the lines
indicated below.

```
<%= stylesheet_link_tag    "application", :media => "all" %>
<%= javascript_include_tag "application" %>
```

We're not using JavaScript or CSS yet, so there's no need to load in the default
JS and CSS that Rails comes with. This will clean up your log if you're not
already using the `quiet_assets` gem. Additionally, Rails comes with some
dubious JS tricks you can use, but we want you to learn the better way. For
example, the built-in Rails JS allows you to use plain links to delete
resources:

```ruby
link_to 'Delete Me', post_url(@post), method: :delete
```

Links in HTML are only supposed to issue `GET` requests, but Rails's JS will
use JavaScript magic to issue a `DELETE` request in this case. Using JS to make
links do something they weren't designed to do seems hacky. We prefer you use
`button_to`, which creates a form to properly issue a non-`GET` request:

```ruby
button_to 'Delete Me', post_url(@post), method: :delete
```

Removing the default Rails JS for now will help you get used to doing things
the right way. We will tell you to put these back when we hit the JS & CSS
portion of our course.


## Use Common Debugging Gems

You want to use `better_errors` and `binding_of_caller`, which will
make it much easier to see what is going on in your Rails app. You
also want to use `pry-rails`, which will provide a nicer console than
IRB when you run `rails console`. Lastly, you can use the
`quiet_assets` gem, which will reduce excessive logging of requests
for CSS/JavaScript files, making it easier for you to read your Rails
logs:

```ruby
# Add to Gemfile
group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'pry-rails'
  gem 'quiet_assets'
end
```

**Note:** You should always place these gems in the `development` group. Rails
supports three environments by default: development, test, and production.
Development is what it runs in on your localhost. Test is what it runs in when
you run RSpec tests. Production is what it will run in on Heroku or other hosts
that make your app available to the Internet. You *never* want gems like
`better_errors` or `binding_of_caller` running in production. In addition to
loading unnecessary code, these gems will constitute a huge security hole if
their features are exposed to the Internet. So whenever you install a new gem,
think carefully about which environment(s) it is applicable to.
