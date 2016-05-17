# Intro to SQL and ActiveRecord

## w3d1

+ **Assessment02** ([practice][assessment-practice]) ([additional practice][assessment-practice2])
    + We'll implement a simple version of a well-known card game. We'll announce
      the specific game, and you can look up the basic rules ahead of time.
+ SQL Fundamentals (Read them first!)
    + [SQL For The Impatient][sql-intro]
    + [A Visual Explanation of Joins][visual-joins]
    + [Formatting SQL Code][sql-formatting]
+ [Learning SQL: Setup][learning-sql-setup]
+ [Learning SQL: Part I][learning-sql-part-i]
+ **Project**: [SQL Zoo][sqlzoo-readme]

[assessment-practice]: http://github.com/appacademy/assessment-prep
[assessment-practice2]: http://github.com/appacademy/assessment-prep

[sql-intro]: ../../sql/readings/sql-intro.md
[visual-joins]: http://www.codinghorror.com/blog/2007/10/a-visual-explanation-of-sql-joins.html
[sql-formatting]: ../../sql/readings/formatting.md

[learning-sql-setup]: ../../sql/readings/setup.md
[learning-sql-part-i]: ../../sql/readings/part-i.md
[sqlzoo-readme]: ../../sql/projects/sqlzoo

## w3d2

+ [Learning SQL: Part II][learning-sql-part-ii]
+ [SQLite3][sqlite3]
+ [Heredocs][heredocs]
+ _optional_ [sql-ex][sql-ex]
+ **Demo Readings**: [SQLite3 demo][sqlite3-demo]
    + Make sure to read this before class! It is essential!
+ **Project**: [AA Questions][aa-questions]

[learning-sql-part-ii]: ../../sql/readings/part-ii.md
[sqlite3]: ../../sql/readings/sqlite3.md
[heredocs]: ../../sql/readings/heredocs.md
[sql-ex]: http://www.sql-ex.ru/

[sqlite3-demo]: ../../sql/demos/sqlite3_demo

[aa-questions]: ../../sql/projects/aa_questions

## w3d3

* [Your first Rails project][first-rails-project]
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

[first-rails-project]: ../../sql/readings/first-rails-project.md
[ar-migrations]: ../../sql/readings/migrations.md
[ar-orm]: ../../sql/readings/orm.md

[belongs-to-has-many]: ../../sql/readings/belongs-to-has-many.md
[has-many-through]: ../../sql/readings/has-many-through.md
[has-one]: ../../sql/readings/has-one.md
[rails-conventions]: ../../sql/readings/rails-conventions.md
[unconventional-associations]: ../../sql/readings/unconventional-associations.md

[validations]: ../../sql/readings/validations.md
[custom-validations]: ../../sql/readings/custom-validations.md
[validations-misc]: ../../sql/readings/validations-misc.md

[ar-indexing]: ../../sql/readings/indexing.md

[associations-exercise]: ../../sql/projects/associations_exercise
[url-shortener]: ../../sql/projects/url_shortener

## w3d4

+ [ActiveRecord::Relation][relation]
+ [ActiveRecord and Joins][ar-joins]
+ [Scopes][scopes]
+ [More on Querying][querying-ii]
+ [Ternary Logic in SQL][sql-ternary-logic] (optional)
+ **Demo**: [JoinsDemo][joins-demo]
+ **Project**: [Polls][polls-app]

[relation]: ../../sql/readings/relation.md
[ar-joins]: ../../sql/readings/joins.md
[scopes]: ../../sql/readings/scopes.md
[querying-ii]: ../../sql/readings/querying-ii.md
[sql-ternary-logic]: ../../sql/readings/sql-ternary-logic.md

[joins-demo]: ../../sql/demos/joins_demo

[polls-app]: ../../sql/projects/polls_app

## w3d5

+ [Metaprogramming][metaprogramming]
+ [Class Instance Variables][class-instance-variables]
+ [Reading Demo: send][meta-send]
+ [Reading Demo: macros][meta-macros]
+ **Solo Project**: [Build Your Own ActiveRecord][build-your-own-ar]
+ :joy_cat: **5pm Happy Hour!** :joy_cat:

[metaprogramming]: ../../sql/readings/metaprogramming.md
[class-instance-variables]: ../../sql/readings/class-instance-variables.md
[meta-send]: ../../sql/demos/send.rb
[meta-macros]: ../../sql/demos/macros.rb
[build-your-own-ar]: ../../sql/projects/active_record_lite

## w3d6-w3d7

+ [Callbacks][callbacks]
+ [Delegation][delegation]

[callbacks]: ../../sql/readings/callbacks.md
[delegation]: ../../sql/readings/delegation.md
