# Movie Buff

Estimated Time: 4 hrs.

For this project you will be writing Active Record queries against the the actors, 
movies, and castings tables from the SQL Zoo project. We've written rspec tests 
to check both that you return the correct results and query the database the 
correct number of times. 

It may be helpful to refer to the SQL Zoo solutions for guidance as 
you work through these problems. Also make sure to reference the [readings from last
night](https://github.com/appacademy/curriculum/tree/master/sql#readings-65-min) as well as the [Active Record docs](http://guides.rubyonrails.org/active_record_querying.html). 

## Setup

First make sure Postgres is running.

Then download the [skeleton](./skeleton.zip?raw=true). Run `bundle install` 
and `./setup` to populate the database. 

There is only one spec file. If you'd like to run specs for a particular problem, 
simply append the corresponding line number. 

```
bundle exec rspec spec/movie_buff_queries_spec.rb:92
```

Do your work in `skeleton/movie_buff/queries.rb`. Information on the tables you
will be querying can be found at the top of the file. 

## Notes on building Active Record Queries

You can manually test queries in the `rails console`. By chaining `to_sql` on 
the end of a query you can inspect the SQL query Active Record makes under the 
hood. This is particularly useful for debugging. ActiveRecord also has a method 
`as_json` that provides the jsonified output of a query. 

ActiveRecord can join associations defined on the model. We've gone ahead and
defined associations for actors, castings, and movies for you.

Have fun and good luck!
