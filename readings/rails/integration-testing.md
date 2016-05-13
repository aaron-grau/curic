# Integration Testing

**Integration tests** do exactly what it sounds like they do. They test
the *integration* of different components. **Unit tests** ensure that
each individual *unit* of the application works independently, but no
amount of unit testing can guarantee that all the parts of your
application work *together*. This is why we need integration tests.

Integration tests typically test end-to-end app flows. An example would
be testing an endpoint that goes through your application to grab info
from the database and then displays it on a page. In order for this test
to work, your route, controller, models, database, and view all have to
work correctly and talk to each other.

## Integration Testing Strategies

In a sense, when you write an integration test, you are also testing the
*units* (controller, view, model) that are involved that test, so you
could skip the unit tests for these constituent parts. Many companies do
this, but there are some pitfalls:

Integration tests are slow, so if you try to write one for every
edge-case, they will bring your test suite to a crawl. Then no one will
run the tests, which defeats the whole purpose.

Integration tests are also very brittle because they have a lot of
dependencies. Imagine how frustrating it would be to have to change 30
integration tests just because you made a simple change in the UI or
modified an interface somewhere deep in the stack. Often, these tweaks
don't get caught, and the tests just rot and become useless.

An alternate strategy is to write a large number of unit tests that
serve as the foundation for a small number of partial integration tests,
which underpin an even smaller number of end-to-end integration tests.
This is known as the [**testing pyramid**][testing-pyramid].

[testing-pyramid]: https://www.scrumalliance.org/community/spotlight/mike-cohn/december-2014/test-automation-let-service-be-your-middle-man
