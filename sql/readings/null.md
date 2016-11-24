## NULL and Ternary Logic in SQL

SQL uses **ternary logic**. This means that a conditional statement can
evaluate to `TRUE`, `FALSE` or `NULL`. Whaaaa? :open_mouth: That is
strange.

How in the world do you get a conditional statement to return `NULL`?
You compare something to `NULL`, that's how!

Incidentally, `NULL` compared to anything (including `NULL`) is `NULL`,
and `NULL` is falsy, so `WHERE` clauses that compare to `NULL` will
_always_ return nothing. This is why you see `IS NULL` and `IS NOT NULL`
in SQL queries instead of `= NULL` or `!= NULL`.
