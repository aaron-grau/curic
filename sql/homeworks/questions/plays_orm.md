# Plays-Playwrights ORM

In tonight's videos, we saw how to implement an ORM for the `plays` database.  Your homework is to expand this ORM!  You can find all the code from the video lectures [here][plays-demo].

Let's add the following methods to our ORM:
  * `Playwright::all`
  * `Playwright::find_by_name(name)`
  * `Playwright#new`
  * `Playwright#create`
  * `Playwright#update`
  * `Playwright#get_plays` (returns all plays written by playwright)
  * `Play::find_by_title(title)`
  * `Play::find_by_playwright(name)` (returns all plays written by playwright)

Remember, our `PlayDBConnection` class accesses the database stored in `plays.db`, which includes both the `plays` and `playwrights` tables.

As always, thoroughly test your ORM to make sure all the methods are functioning properly.  

Solutions can be found in the [homework solutions folder][hw-solutions].  Please wait until you have completed the exercise to check the solutions.  

[plays-demo]: plays_demo.zip?raw=true
[hw-solutions]: ../solutions
