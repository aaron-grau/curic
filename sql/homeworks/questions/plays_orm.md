# Plays-Playwrights ORM

In tonight's videos, we saw how to implement an ORM for the `plays` database.  Your homework is to expand this ORM!  You can find all the code from the video lectures [here][plays-demo].

Let's add the following methods to our ORM:
  * `Play::find_by_title(title)`
  * `Play::find_by_playwright(name)` (returns all plays written by playwright)

In addition, create a Playwright class and add the following methods to our ORM.
  * `Playwright::all`
  * `Playwright::find_by_name(name)`
  * `Playwright#new` (this is the initialize method)
  * `Playwright#create`
  * `Playwright#update`
  * `Playwright#get_plays` (returns all plays written by playwright)

Remember, our `PlayDBConnection` class accesses the database stored in `plays.db`, which includes both the `plays` and `playwrights` tables.

### Testing your ORM

  * Open up pry and load the plays.rb file
  * Initialize an instance of the Playwright class by calling `Playwright#new` and passing it the necessary arguments.
    + Call `Playwright#create` on the instance that you just initialized. Then call `Playwright::all` to see that it was added to the database correctly.
  * Similarly, test `Playwright#update`, and `Playwright#get_plays` by calling them on instances of the Playwright class.

For a more detailed look at how to test your ORM, refer to the [ORM Demo][orm-demo-video] (Jump to 18m25s).

Solutions can be found in the [homework solutions folder][plays-solutions].  Please wait until you have completed the exercise to check the solutions.  

[plays-demo]: plays_demo.zip?raw=true
[plays-solutions]: ../solutions/plays_demo
[orm-demo-video]: https://vimeo.com/167672029#t=18m24s
