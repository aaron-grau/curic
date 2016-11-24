## NULL and Ternary Logic in SQL

SQL uses **ternary logic**. This means that a conditional statement can
evaluate to `TRUE`, `FALSE` or `NULL`. Whaaaa? :open_mouth: And somehow `NULL`
is still 'falsy'? Unfortunately, this won't be the only time you run into logic
that defies intuition. *Stay tuned for Javascript quirks.*

The only way that a conditional statement will evaluate to `NULL` is by using
the traditional `==` or `!=` comparisons to check if something is `NULL`. Given
that this sort of comparison doesn't yield any useful information, always use
`IS NULL` or `IS NOT NULL` in place of the traditional comparisons.
