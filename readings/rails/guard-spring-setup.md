# Fast and easy testing with `spring` and `guard`

## Gems

Make sure that your Gemfile includes these entries (and `bundle
install`):

```rb
group :development, :test do
  gem 'spring'
  gem 'rspec-rails'
end

group :development do
  gem 'spring-commands-rspec'
  gem 'guard-rspec'
end
```

* `spring` is a Rails application preloader; it's included by default in
Rails 4.1+ apps. Spring speeds up development by keeping your
application running in the background, so you don't need to boot it
every time you run a test, rake task, or migration. Loading up your
Rails application usually takes several seconds (that's distinct from
the time to actually run the specs), which is pretty annoying when you
might be running your test suite several times per minute.

* `rspec-rails` is somewhat self-explanatory.

* `spring-commands-rspec` allows you to leverage Spring's preloading
when running your RSpec tests.

* `guard` is a gem that monitors for changes to files whose paths match
regular expressions that we set up. The `guard-rspec` plugin will
install the main `guard` gem as a dependency and allows us to trigger
the execution of RSpec tests in response to changes to your app's files.

## Setup Guard

Run:

```
bundle exec guard init
```

This will create a `Guardfile` for you. This is where you setup regexs
to match file paths that you want to monitor. Since we have
`guard-rspec` installed, the generated Guardfile file will include a
bunch of comments and a default Guard setup for running RSpec tests for
a Rails app. That's fine, and might be a good starting point for a large
app where you only want to run certain specs when certain files are
changed, but without proper tweaking Guard probably won't guess quite
correctly which specs you want to run and when. For simplicity's sake,
we can start with a brute-force approach, and simply run all of the
specs whenever any file changes in the `app` or `spec` directories (or
`config/routes.rb`, for good measure.) Simply replace everything in your
`Guardfile` with these five lines:

```rb
guard :rspec, cmd: 'spring rspec' do
  watch(%r{^app/}) { "spec" }
  watch(%r{^spec/}) { "spec" }
  watch('config/routes.rb') { "spec" }
end
```

Our ability to call `guard :rspec` here comes from the `guard-rspec`
plugin gem that we installed. Also, note that we are passing `cmd:
'spring rspec'`. This will leverage `spring`'s application preloading to
run our specs quickly.

As your test suite grows larger, you can change the catch-all `"spec"`
command to name a specific spec directory (such as `"spec/models"` or
`"spec/features"`) or a specific spec file (such as
`"spec/features/auth_spec.rb"`) to only trigger the execution of
whichever specs you are focusing on at the moment.

## Setup Rspec

If you haven't already, set up RSpec with

```
rails g rspec:install
```

## Setup Spring

Run:

```
spring binstub --all
```

This will create and/or modify some files in your `bin` directory so
that certain commands (`rspec`, `rake`, and `rails`) can be run via the
Spring runner.

## Every Day I'm Testing

You are ready to roll! Run

```
bundle exec guard
```

to fire up a Guard console. Now whenever you save a file, Guard should
run all of your specs for you! They will run as slowly as ever the first
time around, because Spring hasn't loaded our application's environment
yet. But the second time that you save a file and your specs run (and
every time thereafter), they should run noticeaby more quickly. Super
convenient, right? :)

## Problems?

### Version issues

You might see an error like `You have already activated spring 1.3.3,
but your Gemfile requires spring 1.3.2`. This is fixed easily with
`bundle update spring`.

### Other

If you run into any problems that you suspect are `spring`-related, the
command `spring stop` (at the command line) will shut down the Spring
server. In particular, if you find that `rails g rspec:install` is
hanging, try stopping Spring and running `rails g rspec:install` again.

After stopping Spring, it will automatically boot back up again (with
your latest application environment) when you next run a test, rake
task, or migration.
