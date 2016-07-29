## Controllers

Today's homework is going to focus on controllers. You can find the recommended soundtrack [here][controlla-by-drake].

**Things to know for this homework:**
- Views are a new concept that you will be learning about in greater detail during tomorrow's homework. For now, just know that they access our controller's instance variables and are what we actually see on the page.
- In the videos/readings on controllers so far, we have seen them `render :json`; for this assignment, we will be rendering templates instead (e.g. to render the `index`, we simply `render :index`; to redirect to the index, we simply `redirect_to` the url that matches our intended route when we `rake routes` - in this case, the `books_url`).

A basic rails project has already been made for you - except for the controllers. Download the [skeleton zip][skeleton]. To set up, navigate into the project directory and run:
```ruby
bundle install
rake db:setup
rails s
```
Now we have some basic data and our server is running and ready to take requests.

### Index and Destroy

The app has a basic library of books. Right now, we only have routes to see the list of all books (`:index`) and delete (`:destroy`) whichever books we like; we can see that these are the only available options to us by checking our `routes.rb` file in the `db` folder:

```ruby
Rails.application.routes.draw do
  resources :books, only: [:index, :destroy]
end
```

Check those out by navigating to `localhost:3000/books`. Whoops! We get this error:

![image of index error](./public/index_error.png)

Our books' `index` view is expecting there to be a `@books` variable that contains all the books from the database, but it's currently `nil`. This is a job for our controller's `index` action! Get your index working so that `@books` is correctly set to all books and we can see our library's index page.

Now we can see our awesome library of books, but how about deleting them? Try one of those delete buttons and you'll notice another error: `Template is missing`. Rails is automatically searching for our `destroy` template. But we actually don't need one! We don't want to render a delete page -- we just want to update the index page so that our deleted book is no longer showing. Find the book in question, delete it, and `redirect_to` the index page. This redirect will override the default search for a `destroy` template.

### New and Create

Delete some books. You'll notice that our library is shrinking, but there's no way to add new books to our collection (that 'add a book' link down at the bottom isn't work!). Let's add that functionality. To do this, we need corresponding routes that will 1) give us the form to add a book and 2) save that new book to the database (`:new` and `:create`, respectively). Let's update our `routes.rb` file to reflect this. It should look like this:

```ruby
Rails.application.routes.draw do
  resources :books, only: [:new, :create, :index, :destroy]
end
```

Now we can check our existing routes by running `bundle exec rake routes` in the terminal. We have these `:new` and `:create` routes now, and they are expecting the corresponding controller actions to work properly when we navigate to them. Let's finish up by writing those `new` and `create` controller actions! The `new` action's job is just to direct us to the page with the form to add a book; `create` is what will actually save that new book with the parameters we give it to the database.

Feeling stuck? Revisit the controllers videos and additional readings!

Once you've got it working, celebrate by adding some of your favorite books! :books:

[controlla-by-drake]: https://soundcloud.com/octobersveryown/drake-controlla
[skeleton]: ./library.zip?raw=true
