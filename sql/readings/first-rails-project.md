# Initializing a Rails project with Postgres

This unit begins our foray into ActiveRecord; a component of Rails
that is a way for your Ruby code to interact with a SQL
database. ActiveRecord is maybe the most important part of Rails;
after you master it, you will probably find the rest of Rails pretty
straightforward.

First, make sure that rails is installed:

```sh
  gem install rails -v '~> 4.2.0'
```

Next, generate a new Rails *project*:

```sh
  rails new DemoProject
```

This will create a folder `DemoProject`, with a bunch of Rails
directories in them.

**NB**: If you're starting a new rails app and would like to use
Postgres, you can specify the database flag when generating the app.
This will add the correct gem and have sensible defaults in
`config/database.yml`.

```sh
  rails new DemoProject --database postgresql
```

Open up the `Gemfile` file (located in your new `DemoProject` folder).
Rails sets you up with a bunch of gems by default, but there are a few
other gems we recommend that will make your life **much** easier. You
should get in the habit of including the the following gems to your 
`development` group:

```ruby
    group :development do
      # Run 'annotate' in Terminal to add helpful comments to models.
      gem 'annotate'

      # These two give you a great error handling page.
      # But make sure to never use them in production!
      gem 'better_errors'
      gem 'binding_of_caller'

      # Gotta have byebug...
      gem 'byebug'

      # pry > irb
      gem 'pry-rails'
    end
```

This will allow us to do things like interact with our Rails project
using the pry console. Next, make sure you are in the DemoProject
directory and run:

    bundle install

This will look for the Gemfile and then install the *dependencies*
listed in it.

## Postgres

As noted above, you can initialize a new Rails app with a Postgres
database by using the `--database=postgresql` option. If, however, you
want to **switch** an existing Rails app from SQLite to Postgres, it is
possible to do so. This is convenient because differences between your
development and production databases can be frustrating.

First, replace the `gem 'sqlite3'` line in the `Gemfile` with `gem
'pg'`.

Next, edit `config/database.yml`. Change the `default` environment:

```yaml
default: &default
  adapter: postgresql
  pool: 5
  timeout: 5000
```

You will have to create a database with the given name. Name your development, test, and production databases as shown below:

```rb
development:
  <<: *default 
  database: ProjectName_development
```

Then run `rake db:create`.
