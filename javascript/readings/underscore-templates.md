# Underscore templates

As we know, JavaScript can modify the page by injecting new content
into the DOM. For instance:

```html
<ul id="my_list">
</ul>

<script type="application/javascript">
  var $ul = $("#my_list");
  _.times(3, function () {
    $ul.append("<li>One more time!</li>")
  });
</script>
```

This works, but if we want to build and inject relatively complicated
HTML client-side, we should use some kind of template, just like we do
in server-side RoR code.

## Underscore Templates

Underscore can render templates client-side. Let's see a template:

```html
<script type="text/template" id="widgets_template">
  <ul>
    <% _(widgets).each(function (widget) { %>
      <li>
        <%= widget.name %> -- <%= widget.price %>
      </li>
    <% }); %>
  </ul>
</script>
```

The contents of the script tag look like ERB. That's because
Underscore templates are intended to mimic ERB.

We place the content of the template inside a script tag. The
`text/template` script `type` tells the browser that this is not
JavaScript and it should not try to execute the template as if it were
JS code.

Using the template like this involves a four step process:

0. Grab the template script tag, read its contents.
0. "Compile" the template code: generate a function that, when
   executed, evaluates the template.
0. Run the compiled template function.
0. Inject the content into the page.

```html
<div id="widgets_div">
  <!-- this is where the rendered template content will be injected -->
</div>

<script type="text/template" id="widgets_template">
  <ul>
    <% _(widgets).each(function (widget) { %>
      <li><%= widget.name %> -- <%= widget.price %></li>
    <% }); %>
  </ul>
</script>

<script type="application/javascript">
  // templateCode is a string with the contents of the script tag.
  var templateCode = $("#widgets_template").html();

  // compile the template code to a JavaScript function
  var templateFn = _.template(templateCode);

  // evaluate the template; producing html
  var renderedContent = templateFn({
    // variables in here are available inside the template
    widgets: [
      { name: "Big widget", price: "$100" },
      { name: "Lil widget", price: "$8" }
    ]
  });

  // finally, we can inject the content
  $("#widgets_div").html(renderedContent);
</script>
```

## ERB + Underscore

Because ERB and underscore templates are so similar, they can get in
each other's way. For instance, this won't work:

```html+erb
<!-- app/views/widgets/show.html.erb -->
<h1><%= @widget.name %></h1>

<script type="text/template" id="silly_template">
  <ul>
    <% _.times(3, function () { %>
      <li>Three cheers for widgets!</li>
    <% }); %>
  </ul>
</script>

<script type="application/javascript">
  // code to render and inject the template
</script>
```

The problem is that when ERB renders the view server-side, the
`<%` and `%>` in the underscore template will confuse it. ERB does not
understand that this is supposed to be interpreted client-side. ERB
tries to evaluate the code in the underscore template tags, but
because this is JS code and not Ruby, ERB errors out.

We can fix him. We have the technology. Just use `<%%` which "escapes"
the `%` sign:

```html+erb
<!-- app/views/widgets/show.html.erb -->
<h1><%= @widget.name %></h1>

<script type="text/template" id="silly_template">
  <ul>
    <%% _.times(3, function () { %>
      <li>Three cheers for widgets!</li>
    <%% }); %>
</script>

<script type="application/javascript">
  // code to render and inject the template
</script>
```

## References

* [`_.template`][template-doc]

[template-doc]: http://underscorejs.org/#template
