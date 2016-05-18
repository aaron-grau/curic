# Intro to SQL and ActiveRecord

## w3d1

### Readings

+ **Assessment02** ([practice][assessment-prep])
    + We'll implement a simple version of a well-known card game. We'll announce
      the specific game, and you can look up the basic rules ahead of time.
+ SQL Fundamentals (Read them first!)
    + [SQL For The Impatient][sql-intro]
    + [A Visual Explanation of Joins][visual-joins]
    + [Formatting SQL Code][sql-formatting]
+ [Learning SQL: Setup][learning-sql-setup]
+ [Learning SQL: Part I][learning-sql-part-i]

### Homeworks

+ Complete [SQL Zoo Select Basics][sql-zoo-select] on the Sql Zoo Website

### Projects

+ [SQL Zoo][sqlzoo-readme]

[assessment-prep]: http://github.com/appacademy/assessment-prep

[sql-intro]: readings/sql-intro.md
[visual-joins]: http://www.codinghorror.com/blog/2007/10/a-visual-explanation-of-sql-joins.html
[sql-formatting]: readings/formatting.md

[learning-sql-setup]: readings/setup.md
[learning-sql-part-i]: readings/part-i.md
[sqlzoo-readme]: projects/sqlzoo
[sql-zoo-select]: http://sqlzoo.net/wiki/SQLZOO:SELECT_basics

## w3d2

+ [Learning SQL: Part II][learning-sql-part-ii]
+ [SQLite3][sqlite3]
+ [Heredocs][heredocs]
+ _optional_ [sql-ex][sql-ex]
+ **Demo Readings**: [SQLite3 demo][sqlite3-demo]
    + Make sure to review this before class! It is essential!
+ **Project**: [AA Questions][aa-questions]

[learning-sql-part-ii]: readings/part-ii.md
[sqlite3]: readings/sqlite3.md
[heredocs]: readings/heredocs.md
[sql-ex]: http://www.sql-ex.ru/

[sqlite3-demo]: demos/sqlite3_demo

[aa-questions]: projects/aa_questions

## w3d3

* [Creating a new rails project][first-rails-project]
+ [Migrations][ar-migrations]
+ [What is an ORM?][ar-orm]
+ Associations
    + [`belongs_to` and `has_many`][belongs-to-has-many]
        * Learn this well; specify
          `class_name`/`primary_key`/`foreign_key` on all associations
          until I give you leave to let Rails infer these.
    + [`has_many :through`][has-many-through]
    + [`has_one`][has-one] (exercises)
    + [Rails Conventions][rails-conventions]
    + [Unconventional Associations][unconventional-associations]
+ Validations
    + This stuff is less important than mastering associations and can
      be read during class the next day if necessary.
    + [Basics][validations]
    + [Custom Validations][custom-validations]
    + [Miscellaneous][validations-misc]
+ [ActiveRecord and Indexes][ar-indexing]
    + This is also less vital and can be read the day of the project.
+ **Exercise**: [Associations Exercise][associations-exercise]
+ **Project**: [URL Shortener][url-shortener]

[first-rails-project]: readings/first-rails-project.md
[ar-migrations]: readings/migrations.md
[ar-orm]: readings/orm.md

[belongs-to-has-many]: readings/belongs-to-has-many.md
[has-many-through]: readings/has-many-through.md
[has-one]: readings/has-one.md
[rails-conventions]: readings/rails-conventions.md
[unconventional-associations]: readings/unconventional-associations.md

[validations]: readings/validations.md
[custom-validations]: readings/custom-validations.md
[validations-misc]: readings/validations-misc.md

[ar-indexing]: readings/indexing.md

[associations-exercise]: projects/associations_exercise
[url-shortener]: projects/url_shortener

## w3d4

+ [ActiveRecord::Relation][relation]
+ [ActiveRecord and Joins][ar-joins]
+ [Scopes][scopes]
+ [More on Querying][querying-ii]
+ [Ternary Logic in SQL][sql-ternary-logic] (optional)
+ **Demo**: [JoinsDemo][joins-demo]
+ **Project**: [Polls][polls-app]

[relation]: readings/relation.md
[ar-joins]: readings/joins.md
[scopes]: readings/scopes.md
[querying-ii]: readings/querying-ii.md
[sql-ternary-logic]: readings/sql-ternary-logic.md

[joins-demo]: demos/joins_demo

[polls-app]: projects/polls_app

## w3d5

+ [Metaprogramming][metaprogramming]
+ [Class Instance Variables][class-instance-variables]
+ [Reading Demo: send][meta-send]
+ [Reading Demo: macros][meta-macros]
+ **Solo Project**: [Build Your Own ActiveRecord][build-your-own-ar]
+ :joy_cat: **5pm Happy Hour!** :joy_cat:

[metaprogramming]: readings/metaprogramming.md
[class-instance-variables]: readings/class-instance-variables.md
[meta-send]: demos/send.rb
[meta-macros]: demos/macros.rb
[build-your-own-ar]: projects/active_record_lite

## w3d6-w3d7

+ [Callbacks][callbacks]
+ [Delegation][delegation]

[callbacks]: readings/callbacks.md
[delegation]: readings/delegation.md
