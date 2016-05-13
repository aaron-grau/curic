# PATCH, PUT and DELETE

By default web browsers can only issue POST and GET requests:

```html
<form action="/users" method="POST"></form>

<!-- or -->

<form action="/users/search" method="GET"></form>

<!-- not -->
<form action="/users/123" method="PATCH"></form> <!-- won't work! -->
```

But wait... Doesn't the Rails REST API expose endpoints for PATCH,
PUT, and DELETE methods (verbs)? How do we write a form that sends a
PATCH, PUT, or DELETE?

Rails has baked in the following hack:

```html
<form action="/users/123" method="POST">
  <input type="hidden" name="_method" value="PATCH">
</form>
```

In any form where a PATCH, PUT, or DELETE is the desired method,
simply put a hidden input field with name `_method` and value
`PATCH`/`PUT`/`DELETE`. The browser will still issue a POST request,
but Rails will see the `_method` parameter and pretend as if a
PUT/DELETE was made.


# PATCH vs. PUT

**Just use PATCH**.

In the HTTP standard, the `PUT` method is meant for sending a complete
resource to overwrite the existing version of that resource on the
server. A `PATCH` request is meant for when you only send the updated
attributes of the resource to the server.

Before Rails 4.0, the update action responded only to a `PUT` request.
The use of `PATCH` is more accurate, because with Rails we usually
just send the updated attributes to the server, and not a complete
copy of the resource we are updating.

In Rails, `PUT` and `PATCH` both mean the same thing. The `resources`
method creates routes for `PUT` and `PATCH` that both map to `#update`
(type in `rake routes` and see for yourself). This is not technically
"correct" according to API purists (ah, the meaningless ideological
debates of the internet!). For this reason, you should avoid `PUT` and
always use `PATCH`. If you want to know why, just do a quick Google
search or look at the links below.


## Resources

* [A simple explanation of basic HTTP methods and their meanings][standard-api-methods]

#### RFCs (tl;dr)

* [W3 http method definitions][http-method-defs]
* [W3 PATCH definition][patch-def]

[standard-api-methods]: https://github.com/restfulapi/api-strategy#use-standard-http-methods
[http-method-defs]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
[patch-def]: https://tools.ietf.org/html/rfc5789
