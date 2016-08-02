# Setting Up RSpec with Ruby on Rails

## Overview

RSpec is a tool for testing Ruby applications, and is often used to test
Rails apps. Set-up will include the following steps.

* Add RSpec and other useful gems to your Gemfile, and install with
 Bundler
* Set up a test database, if necessary
* Configure RSpec
* Configure the Rails Application to generate test files automatically
  as features are added

## Adding RSpec Gems

Add the following to the Gemfile of your Ruby on Rails application:

```ruby
# my_app/Gemfile

group :development, :test do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
end

group :test do
  gem 'faker'
  gem 'capybara'
  gem 'guard-rspec'
  gem 'launchy'
end
```

Right now, we'll be focusing on `rspec-rails`. The rest of the gems will be explained in future readings.

Next run bundle from the command line to install the gems:
``
$ bundle install
``

You now have the necessary gems.

## The Test Database

Open up `config/database.yml`.  By default it should look like this:

```ruby
#my_app/config/database.yml

# SQLite version 3.x
#   gem install sqlite3
#
#   Ensure the SQLite 3 gem is defined in your Gemfile
#   gem 'sqlite3'
#
default: &default
  adapter: sqlite3
  pool: 5
  timeout: 5000

development:
  <<: *default
  database: db/development.sqlite3

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: db/test.sqlite3

production:
  <<: *default
  database: db/production.sqlite3
```

(This will be slightly different if you have
[switched to Postgres][postgres].)

[postgres]: ../../sql/readings/first-rails-project.md#postgres

Notice there are three sets of configuration data: one for
`development`, one for `test`, and one for `production`. When you are
running a server on localhost, Rails is using the `development`
database. For running tests, it will use a separate `test` database. The
default configuration will work just fine for testing with RSpec.

If you are using postgresql, you must run `rake db:create` on the
command line to create your development and test databases.

## Configure RSpec

Next, install RSpec by entering the following on the command line:

```
$ rails g rspec:install
```
A successful install will output the following message:
```
    create  .rspec
    create  spec
    create  spec/spec_helper.rb
    create  spec/rails_helper.rb
```

We want to tweak the default RSpec configuration so that it will format
its output in a readable way. To do this, make your `.rspec`
configuration file look like this:

```
--color
--require spec_helper
--format documentation
```
If you are interested in customizing RSpec further, check out
[the documentation here][rspec-doc].

[rspec-doc]: http://rubydoc.info/github/rspec/rspec-core/RSpec/Core/Configuration

## Auto-Generate Test Files

Lastly, we will configure Rails to auto-generate starter files to test
with RSpec, rather than the using the default TestUnit included in
Rails.

Open `config/application.rb` and add the following code inside the
Application class:

```ruby
# my_app/config/application.rb

config.generators do |g|
  g.test_framework :rspec,
    :fixtures => false,
    :view_specs => false,
    :helper_specs => false,
    :routing_specs => false,
    :controller_specs => true,
    :request_specs => false
end
```
You can probably guess what these settings do:

 * `g.test_framework :rspec` tells Rails to use RSpec for testing.

 * `:fixtures => false` means Rails should not generate fixtures for
 each model. (Fixtures are the default Rails way of creating sample data
 for tests.)

 *  `xxxxx_specs => false` means that we won't auto-generate spec files
for views, helpers, routes, or requests.  To start with, we
will focus on testing our models, controllers and the user interface/API (feature specs). As you become more comfortable testing, you may want to change these settings and use tests for the other components, too.

Now you are done! Model specs and controller specs will automatically be generated in the `spec` directory when you `rails g model ...` or `rails g controller ...`. We will manually create a
directory for our feature specs, `spec/features`. This is a special
directory; spec files within it will be given access to Capybara helper
methods. As usual, spec files should follow the naming convention
`class_name_spec.rb`, or something like `auth_spec.rb` for a feature
spec.

## Faster, Easier Testing with Spring and Guard

Haven't had enough fun with setting things up yet? Not to worry. You
might want to go through [this optional process][guard-spring-setup] to
setup the gems Guard and Spring to make your TDD flow a lot smoother.

[guard-spring-setup]: ./guard-spring-setup.md

## Resources
 * [RSpec homepage][rspec-home]
 * [RailsGuides: Testing][rails-guides-testing]
 * [RailsGuides: Configuring Generators][generators]

[rspec-home]: http://rspec.info/
[rails-guides-testing]: http://guides.rubyonrails.org/testing.html
[generators]: http://guides.rubyonrails.org/configuring.html#configuring-generators
