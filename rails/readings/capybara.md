# Testing with Capybara

We use Capybara in **integration tests** to simulate the way that a user
interacts with our app: clicking buttons, visiting links, submitting
forms, etc. Capybara lets you conduct several browser actions in
sequence so you can test the same part of your app in different ways.

For example, you could write a test that...

0. expects to see a welcome screen on the index page if a user isn't
signed in.

You could write another test that...

0. signs in a user
0. expects to see their username on the index page.

You could write a third test that...

0. creates a user
0. logs out that user
0. expects to be redirected to the index page
0. expects the index page to tell the user they've been logged out
0. etc...

## Setting up Capybara

Add Capybara to the 'test' group in your Gemfile and `bundle install`.

```ruby
# Gemfile

group :test do
  gem 'rspec-rails', '~> 3.0'
  gem 'capybara'
end
```

Whenever you want to write new capybara tests, they'll go in the
`spec/features` folder.  This is important: the specs must be
in this directory for the `capybara` methods to work.

At the top of each file, you'll
require the rails_helper:

```ruby
# spec/features/authentication_spec.rb

require 'rails_helper'

...
```

To run the tests individually, run `rspec
spec/features/{file_name}_spec.rb`

## Example

Here's a snippet of how you might test signing up a user:

```ruby
# spec/features/authentication_spec.rb

require 'rails_helper'

feature "the signup process" do

  scenario "has a new user page" do
    visit new_user_url
    expect(page).to have_content "New user"
  end

  feature "signing up a user" do
    before(:each) do
      visit new_user_url
      fill_in 'username', :with => "testing_username"
      fill_in 'password', :with => "biscuits"
      click_on "Create User"
    end

    scenario "redirects to team index page after signup" do
      expect(page).to have_content "Team Index Page"
    end

    scenario "shows username on the homepage after signup" do
      expect(page).to have_content "testing_username"
    end
  end

end
```

Notice we use `feature` rather than `describe`/`context` and `scenario`
rather than `it`/`specify`. This is a [special syntax][capybara-syntax]
just for feature specs.

## Important Methods

*  Visiting a page
	*  `visit('/projects')`
	*	 `visit(post_comments_path(post))`
*  Clicking
	*  `click_link('id-of-link')`
	*  `click_link('Link Text')`
	*  `click_button('Save')`
	*  `click_on('Link Text') # clicks on either links or buttons`
	*  `click_on('Button Value')`
*  Forms
	*  `fill_in('id-of-input', :with => 'whatever you want')`
    *  `fill_in('Password', :with => 'Seekrit')`
    *  `fill_in('Description', :with => 'Really Long Text...')`
	*  `choose('A Radio Button')`
	*  `check('A Checkbox')`
	*  `uncheck('A Checkbox')`
	*  `attach_file('Image', '/path/to/image.jpg')`
	*  `select('Option', :from => 'Select Box')`
*  Content (`page`)
	* `expect(page).to have_content('Blah blah blah')`


**Read the [docs][capybara-docs] for more**.

## Miscellaneous notes

1. By default, RSpec runs each test in a transaction and rolls it back after the
   test is done.  This behavior is the same when using capybara without
   the setting ':js => true'.  Setting ':js => true' for a test switches to
   the 'selenium' webdriver, and does not use transactions.
   In those cases, to make sure you have a clean database for each
   of your tests you can use the [database-cleaner][db-cleaner] gem.

2. You can see what your pages look like in the middle of your capybara
   tests by using the [Launchy] gem.  Just add it to your test group in
   your Gemfile, bundle, and call `save_and_open_page` whenever you want
   to check what a page looks like.  Launchy will open it in a new
   browser window for you.

	E.g.

```ruby
	it "has an index page" do
		visit posts_url
		save_and_open_page
		expect(page).to have_content("Index")
	end
```

## Additional Links

*  [`capybara` docs][capybara-docs]
*  Railscast on Capybara: [http://railscasts.com/episodes/257-request-specs-and-capybara](http://railscasts.com/episodes/257-request-specs-and-capybara)


[capybara-docs]: http://rdoc.info/github/jnicklas/capybara#The_DSL
[db-cleaner]: https://github.com/bmabey/database_cleaner
[Launchy]: http://rubygems.org/gems/launchy
[capybara-syntax]: https://www.relishapp.com/rspec/rspec-rails/docs/feature-specs/feature-spec
