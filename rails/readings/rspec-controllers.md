# Testing Controllers with Rspec

## Overview

We test controllers in Rails to make sure that our controller actions are rendering the correct response.  

Controller testing in Rails is an example of "service level testing" - the middle level of the Testing Pyramid. Controller tests are simpler to write and run faster than integration tests. Solid controller tests are an important part of a strong Rails test suite.

## Creating the spec files

If you've already run `rails generate rspec:install`, then Rails will
automatically make spec files for you when you generate a controller.
Otherwise, run `rails generate rspec:controller #{model_name}`.

To run the controller tests file-by-file, run `rspec spec/controllers/{controller_name}_spec.rb`.

## Writing tests

You should write tests for each action in your controllers.

RSpec Rails provides us with several helpful methods for testing controllers. We can use RSpec rails to simulate a request, then verify that the controller sends back the correct response.

Here are some useful matchers you may wish to use:
* `render_template`
* `redirect_to`
* `have_http_status`

Let's look at an example. Assume that we are testing our app's `LinksController`.

```ruby
class LinksController < ApplicationController
  def new
    @link = Link.new
    render :new
  end

  def create
    @link = Link.new(link_params)

    if @link.save
      redirect_to link_url(@link)
    else
      flash[:errors] = @link.errors.full_messages
      render :new
    end
  end

  # ...
end

```

To simulate a request in RSpec, we specify an http method, controller action, and params. We can then test the `response` using Rspec Rails's controller-specific matchers.

```ruby
RSpec.describe LinksController, :type => :controller do
  describe "GET #new" do
    it "renders the new links page" do
      # this line simulates a "GET" request to the LinksController that hits the #new method, passing in `{link: {}}` as params.
      get :new, link: {}

      # here we check to make sure that the response renders back the new template
      expect(response).to render_template("new")
      expect(response).to have_http_status(200)
    end
  end
end
```

It is important to test the controller's response under different contexts. For example, we should test our `LinksController`'s create method, with both valid and invalid params.

```ruby
describe "POST #create" do

  context "with invalid params" do
    it "validates the presence of title and body" do
      post :create, link: {title: "this is an invalid link"}
      expect(response).to render_template("new")
      expect(flash[:errors]).to be_present
    end
  end

  context "with valid params" do
    it "redirects to the link show page" do
      post :create, link: {title: "teehee", url: "cats.com"}
      expect(response).to redirect_to(link_url(Link.last))
    end
  end
end

```

For more information on controller specs, consult the [documentation][rspec-controller-docs].
[rspec-controller-docs]: https://www.relishapp.com/rspec/rspec-rails/docs/controller-specs
