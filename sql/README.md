# SQL and ActiveRecord
:link: *[w3d1](#w3d1) :: [w3d2](#w3d2) :: [w3d3](#w3d3) :: [w3d4](#w3d4) :: [w3d5](#w3d5)* :link:

## w3d1

### Assessment02
+ [Practice][assessment-prep-2]
  + We'll implement a simple version of a well-known card game. We'll announce
  the specific game, and you can look up the basic rules ahead of time.

[assessment-prep-2]: https://github.com/appacademy/assessment-prep#assessment-2

### Materials (67 min)
+ :book: [Programming Paradigms][paradigms] (5 min)
+ :book: SQL Fundamentals
  + [SQL For The Impatient][sql-intro] (20 min)
  + [A Visual Explanation of Joins][visual-joins] (5 min)
  + [Self-Joins][self] (5 min)
  + [Formatting SQL Code][sql-formatting] (5 min)
  + [Subqueries][subquery] (5 min)
  + [NULL][null] (2 min)
  + [CASE][case] (5 min)
  + [COALESCE][coalesce] (5 min)
+ :book: [PostgreSQL Setup][postgres-setup] (10 min)

[paradigms]: readings/paradigms.md
[sql-intro]: readings/sql-intro.md
[visual-joins]: https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/
[self]: readings/self-joins.md
[sql-formatting]: readings/formatting.md
[subquery]: https://sqlbolt.com/topic/subqueries
[null]: readings/null.md
[case]: http://www.postgresqltutorial.com/postgresql-case/
[coalesce]: http://www.postgresqltutorial.com/postgresql-coalesce/
[postgres-setup]: readings/setup.md

### Homeworks (80 min)
+ Complete [SQL Bolt Tutorial][sql-bolt] sections 1 - 12 (80 min)

[sql-bolt]: https://sqlbolt.com/

### Culture
+ [What is Privilege?][privilege] (6 min)
+ [What is Intersectionality?][Intersectionality] (5 min)
+ [12 Things Allies Can Do][allies] (5 min)
+ [How Do I Ally?][allies-2] (7 min)
+ [Getting Started in Social Justice][social-justice] (8 min)

[privilege]: https://www.buzzfeed.com/nicolaharvey/what-is-privilege
[intersectionality]: http://www.care2.com/causes/what-is-intersectionality-and-why-is-it-important.html
[allies]: https://blog.techinclusion.co/tech-diversity-12-things-an-ally-can-do-ca5c93435d26
[allies-2]: https://medium.com/@hadrad1000/how-do-i-ally-being-an-ally-to-women-in-technology-73b70fb86a98
[social-justice]: https://modelviewculture.com/pieces/getting-started-in-techs-social-justice-movement

### Projects
+ **Solo** [SQL Zoo][sqlzoo-readme]

[sqlzoo-readme]: projects/sqlzoo

### Project Solutions
+ [Video solution to Julie Andrews query][julie-andrews-vid]
+ [Video solution to Craiglockhart to Sighthill query][craiglockhart-vid]

[julie-andrews-vid]: https://vimeo.com/184539804
[craiglockhart-vid]: https://vimeo.com/184539167

## w3d2

### Materials (105 min)
:closed_lock_with_key: `go_video_go`
+ :movie_camera: [RDBMS Intro][rdbms-intro-video] (10 min)
+ :movie_camera: [Building a Database][build-db-video] (25 min)
+ :movie_camera: [ORM Intro][orm-intro-video] (5 min)
+ :movie_camera: [ORM Demo][orm-demo-video] (25 min)
+ :book: [SQLite3][sqlite3] (15 min)
+ :book: [Heredocs][heredocs] (5 min)
+ :book: [Little Bobby Tables][xkcd-bobby-tables] (2 min)
+ :movie_camera: [CSS Display Property][css-display-video] (8 min)
+ :book: [CSS Display Property][css-display] (15 min)

[rdbms-intro-video]: https://vimeo.com/167596295
[build-db-video]: https://vimeo.com/167593816
[orm-intro-video]: https://vimeo.com/167805228
[orm-demo-video]: https://vimeo.com/167672029
[sqlite3]: readings/sqlite3.md
[heredocs]: readings/heredocs.md
[xkcd-bobby-tables]: http://xkcd.com/327/
[css-display-video]: https://vimeo.com/151190176
[css-display]: ../html-css/readings/display.md

### Homeworks (35 min)
+ [Plays-Playwrights ORM][plays-orm] (35 min)

[plays-orm]: homeworks/plays

### Additional Resources
+ [PostgreSQL Tutorial][postgresql]
  + Familiarize yourself with Section 2 - 12, but don't try to remember
    it all. Keep this for future reference.

[postgresql]: http://www.postgresqltutorial.com/

### Study Hall 9 - 10am

### Projects
+ [CSS Display Exercise][css-display-exercise]
+ [AA Questions][aa-questions]

[css-display-exercise]: ../html-css/micro-projects/display_box_model
[aa-questions]: projects/aa_questions

## w3d3

### Materials (93 min)
:closed_lock_with_key: `go_video_go`
+ :movie_camera: [Starting a new Rails Project][rails-intro-video] (7 min)
+ :movie_camera: [Migrations][migrations-video] (14 min)
+ :movie_camera: [Models][models-video] (8 min)
+ :movie_camera: [Basic Associations (belongs_to, has_many)][associations-video]  (12 min)
+ :movie_camera: [More Associations (has_many through:...)][associations-2-video] (12 min)
+ :movie_camera: [Validations][validations-video] (13 min)
+ :movie_camera: [Indices][indices-video] (7 min)
+ :movie_camera: [CSS Inherits][css-inherits] (4 min)
+ :movie_camera: [CSS Reset][css-reset] (16 min)
+ **NB**: Video lectures are using Rails 4, but we will be using Rails 5 everywhere else. If you would like to read about some of the more important differences between Rails 4 and Rails 5, check out [this reading][rails-5-updates].

[rails-intro-video]: https://vimeo.com/167799435
[migrations-video]: https://vimeo.com/167799434
[models-video]: https://vimeo.com/167799436
[associations-video]: https://vimeo.com/167799432
[associations-2-video]: https://vimeo.com/167799430
[validations-video]: https://vimeo.com/167799437
[indices-video]: https://vimeo.com/167799431
[css-inherits]: https://vimeo.com/151190179
[css-reset]: https://vimeo.com/151190181

### Homeworks (45 min)
+ [Intro to Rails][intro-rails-homework] (45 min)

[intro-rails-homework]: homeworks/intro_rails

### Additional Resources
+ [Rails 4 vs Rails 5][rails-5-updates]
+ [Creating a new Rails project][first-rails-project]
+ [Migrations][ar-migrations]
+ [ORM Review and Intro to Active Record][ar-orm]
+ Associations:  
  + [`belongs_to` and `has_many`][belongs-to-has-many]
  + [`has_many :through`][has-many-through]
  + [`has_one`][has-one]
  + [Unconventional Associations][unconventional-associations]
  + for now, always specify `class_name`/`primary_key`/`foreign_key`
+ [Basic][validations] and [Custom][custom-validations] Validations
  + [Miscellaneous][validations-misc]
+ [ActiveRecord and Indexes][ar-indexing]

[rails-5-updates]: readings/rails-5-updates.md
[first-rails-project]: readings/first-rails-project.md
[ar-migrations]: readings/migrations.md
[ar-orm]: readings/orm.md
[belongs-to-has-many]: readings/belongs-to-has-many.md
[has-many-through]: readings/has-many-through.md
[has-one]: readings/has-one.md
[unconventional-associations]: readings/unconventional-associations.md
[validations]: readings/validations.md
[custom-validations]: readings/custom-validations.md
[validations-misc]: readings/validations-misc.md
[ar-indexing]: readings/indexing.md

### Projects
+ [CSS Reset Exercise][css-reset-exercise]
+ [Associations Exercise][associations-exercise]
+ [URL Shortener][url-shortener]

[css-reset-exercise]: ../html-css/micro-projects/css_reset
[associations-exercise]: projects/associations_exercise
[url-shortener]: projects/url_shortener

## w3d4

### Assessment03 Practice
+ [Practice][assessment-prep-3]

[assessment-prep-3]: https://github.com/appacademy/assessment-prep#assessment-3

### Materials (103 min)
+ :book: [ActiveRecord::Relation][relation] (15 min)
+ :book: [ActiveRecord and Joins][ar-joins] (25 min)
+ :book: [Scopes][scopes] (10 min)
+ :book: [More on Querying][querying-ii] (15 min)
+ :movie_camera: [CSS Float & Clearfix][css-float-video] (18 min)
+ :movie_camera: [CSS Grid System][css-grid-video] (15 min)
+ :book: [CSS Float & Clearfix][css-float] (5 min)

[relation]: readings/relation.md
[ar-joins]: readings/joins.md
[scopes]: readings/scopes.md
[querying-ii]: readings/querying-ii.md
[css-float-video]: https://vimeo.com/151190182
[css-grid-video]: https://vimeo.com/170320160
[css-float]: ../html-css/readings/floats_clear_fix.md

### Homeworks (60 min)
+ [Movie Buff in Training][movie-buff-hw] (30 min)
+ [N+1 Buster][n1-buster] (30 min)

[n1-buster]: homeworks/n_1_buster
[movie-buff-hw]: homeworks/active_record_warmup

### Additional Resources
+ [Ternary Logic in SQL][sql-ternary-logic]

[sql-ternary-logic]: readings/sql-ternary-logic.md

### Study Hall 9 - 10am

### Projects
+ [CSS Float Exercise][css-float-exercise]
+ [Movie Buff][movie-buff]
+ [Polls][polls-app]

[css-float-exercise]: ../html-css/micro-projects/float
[movie-buff]: projects/movie_buff
[polls-app]: projects/polls_app

## w3d5

### Materials (103 min)
+ :book: [Metaprogramming][metaprogramming] (20 min)
+ :book: [Class Instance Variables][class-instance-variables] (15 min)
+ :book: [Demo: send][meta-send] (5 min)
+ :book: [Demo: macros][meta-macros] (5 min)
+ :book: [Nontechnical Overview of SQL][sql-nontech] (15 min)
+ :movie_camera: [CSS Flexbox][css-flex-video] (19 min)
+ :book: [CSS Display Types][css-display-types] (10 min)

[metaprogramming]: readings/metaprogramming.md
[class-instance-variables]: readings/class-instance-variables.md
[meta-send]: demos/send.rb
[meta-macros]: demos/macros.rb
[sql-nontech]: readings/sql_nontech.md
[css-flex-video]: https://vimeo.com/170512344
[css-display-types]: ../html-css/readings/display.md

### Homework (30 min)
+ [Metacorgis][metacorgi-hw] (30 min)

[metacorgi-hw]: homeworks/meta_corgis

### Project
+ [CSS Flex Exercise][css-flex-exercise]
+ **Solo**: [Build Your Own ActiveRecord][build-your-own-ar]

[css-flex-exercise]: ../html-css/micro-projects/flex  
[build-your-own-ar]: projects/active_record_lite

### :joy_cat: **Happy Hour!** :joy_cat:
