# Intro to Jbuilder

[Jbuilder][jbuilder-docs] is a tool we will use to curate our data.

When we make a request for data in our Rails controllers, by default, we get all
attributes back from the database. We've been using this default behavior so far
by writing things like `render json: @users` at the end of our controller
actions. This has some unfortunate side effects --- for one, we'll send down
everything, including password digests, to the client. This is bad. It also
does not give us flexibility for including associated data.

Enter Jbuilder.

Rather than build HTML views, Jbuilder allows us to construct JSON views with
curated data using Ruby.

It is quite straightforward to use. When making a Jbuilder template, simply
place it in the same place you would put your HTML views, but instead of using
`.html.erb` as your file extension, use `.json.jbuilder`. The same way that ERB
is compiled to an HTML template, Jbuilder templates will be compiled by Rails
and you'll be left with a JSON template.

You also want to set the default format of resources (in the `config/routes.rb`
file) to `:json`. Then Rails will automatically look for a `.json` file when you
pass a template name to `render` (`render :index` for example).

```
instagram_clone
  |- app
      |- ...
      |- views
          |- photos
              |- index.json.jbuilder
              |- show.json.jbuilder
              |- _photo.json.jbuilder
```

As shown in the directory structure above, you can also use partials with
Jbuilder just as you have with ERB.

[jbuilder-docs]:https://github.com/rails/jbuilder
