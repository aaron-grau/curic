# Ruby on Rails

Ruby on Rails is a web application framework written in Ruby. It was developed by David Heinemeier Hansson and first released to the public in July 2004.

Not only is Rails popular with start-ups for its ease in deploying to production, but a number of larger companies like Twitter, Hulu, and Kickstarter use Rails in their stack as well.

Rails became popular for a number of reasons. A major reason is that Ruby is a very readable, versatile, and elegant language. Ruby was designed to be a "joy to use" and that can be seen in its clean, concise code that reads like English.

Rails is an open-source framework, and has a large, active community. This community is another reason why Rails is so popular. Not only is the framework itself well maintained, but there are also a lot of external libraries available through RubyGems that can be easily added to a Rails application.

Rails follows a number of design principles that also contribute to its efficacy in getting an application pushed to production quickly.

## Design Principles

### MVC

Rails is an MVC framework. MVC, or model-view-controller, is a design pattern that divides an application into three basic parts, each responsible for handling a different task.
 + The model is concerned with retrieval of information and any logic done to that information.
 + The view is concerned with representation and output of information
 + The controller is concerned with accepting input and sends commands to the model to fetch or update information, and to the view to display information. It acts as the interface between the model and the view.

### Convention Over Configuration

Rails introduced the concept of convention over configuration (CoC). The idea behind CoC is that the default configuration is already programmed into the framework, and developers only have to be specific upon doing something unconventional.

One convention that Rails makes extensive use of is the naming of various parts of the application. For instance, if we have a `cats` database table, the default model name is `Cat`, and the default controller is `CatsController`. By naming in this way, Rails will automatically know how to load the application to tie all these pieces together.

CoC circumvents having to write a lot of boilerplate configuration. Part of why Rails is popular is that it allows developers to create an application very quickly due to all of this configuration being handled. It also means that any Rails developer can look at any project and know how to navigate it with less extensive documentation.

### REST
REST, or Representational State Transfer, is an architectural style for web services. A RESTful web service allows for access to web resources (e.g., a document, image, web page -- practically anything accessible on the internet!) using standard operations, such as HTTP's `GET`, `POST`, `PATCH`, or `DELETE`.

RESTful web services are stateless; this means that each request/response cycle is independent of any other request/response cycle. The server will not retain any session information over multiple requests. However, data can be cached on the client side.

Rails defaults to a RESTful API.

## Components

### ActiveRecord

All models in Rails inherit from ActiveRecord. ActiveRecord is an ORM, or Object Relational Mapping. It allows us to represent data from a database as Ruby objects, which can then easily be presented or manipulated. In addition, ActiveRecord contains a number of methods which implement basic CRUD (Create, Read, Update, Delete) functionality and which mirror SQL queries.

### ActionController

ActionController handles the controller logic. Among other things, ActionController allows for access to various cookies, which can store small amounts of data such as information about the session or brief error messages that can persist across requests.

It can also provide protection from cross-site request forgery (CSRF) attacks by checking for the presence of authenticity tokens in requests that could modify data (e.g., `POST` or `PATCH` requests).

### ActionView

ActionView is responsible for rendering the views. ActionView templates can take several forms. One of the supported file types is ERB, or Embedded Ruby. ERB files are a mixture of HTML and Ruby code. Writing Ruby code in the views is very helpful -- generating a list of items is as simple as writing a loop. Rails also has a number of built-in helper methods that generate HTML that can be added to a view with ERB.

Another supported file type is a builder file. Instead of rendering HTML, a view could instead render XML or JSON. This is incredibly useful for a route that only returns data that will then be parsed later by more code.

### Rake

Rake is a utility tool packaged with Rails that handles task management. It can be thought of as a scripting tool for Rails, used to carry out administrative tasks such as migrating a database and displaying routes.

Custom rake tasks are easy to create. They're simply written in Ruby and can access any part of your Rails app, such as a model.

### Rack

Rack is a piece of middleware that sits between Rails and the server, receiving requests and generating responses back and forth between the two. There are many different Ruby frameworks that expect a request to come in in a certain way and format their responses in a certain way, and many different web servers that expect the same. Rack insures that every server can interface with every framework.

### WEBrick

WEBrick is the HTTP server that comes standard with Rails, though newer version of Rails are shipping with a default Puma server. WEBrick is written entirely in Ruby and is reliable and easy to use, but it is single threaded -- that is, it can only handle a single request at a time. This means it doesn't scale well and can experience a lot of delay. This makes it ideal for development but not for a production environment.

Puma, however, is very fast and multi-threaded, able to handle requests concurrently, making it a good choice for a production server.

## Other Frameworks

### Sinatra (Ruby)

While both frameworks are coded in Ruby, Sinatra is a lot smaller and simpler than Rails, and can be very useful for small apps. It's easy to make simple requests and present information, but code can get large and messy when trying to accomplish more complex tasks, such as interacting with a database or presenting complex views. To make Sinatra scaleable, we'd have to essentially implement code that comes packaged with Rails, such as ActiveRecord. For large applications, it's easier to simply use a more robust framework in the first place, but Sinatra is a wonderful choice for something simple.

### Node.js (JavaScript)

Node.js is part of the MEAN stack. The MEAN stack consists of four JavaScript technologies that can be used together to create a full-stack app, thus allowing developers to only use one language in all parts of their applications.

Node isn't exactly a framework. It's a runtime environment. It's simply something that runs JavaScript code. Like Ruby's gems, Node has packages called modules -- but unlike Rails, which comes with certain gems and functionality packaged into it, a Node user has to install any modules they want and then write a lot of code by hand to integrate them.

Node offers a lot of flexibility because a developer can choose exactly which modules they want to include, but developing in Rails can be significantly faster because Rails does so much of the work already.

### Django (Python)

Django is also an MVC framework, but where Rails follows the principles of CoC and the readability of Ruby, Django is written in Python, which follows a principle of "explicit is better than implicit." This means that Django code is easy to read and understand because every bit of functionality is explicitly written into every file -- but it also means that a developer will have to write all that code.

Using Rails over Django comes down to preference. Some developers prefer having a lot of the boilerplate done for them, and some prefer seeing and writing exactly what's happening.

### Spring MVC (Java)

Spring MVC is a Java framework. There are a lot of resources available for Spring -- and more resources are continuing to be developed. However, Spring can be very slow. To see a change, Spring has to be completely restarted, which can take a lot of time, and there are very few built-in tools. It also suffers from lack of scalability, because any kind of I/O holds up a thread and slows down the application. In today's world of single-page apps with constant user input, this is a serious drawback.

### Play! (Scala)

Play! can be written in either Scala or Java, and was built to be a more dynamic framework that Java developers would be able to use. Unlike Spring, it supports hot reload, allowing for changes to the code to be seen upon refresh. It also has a lot more built-in functionality and is much more responsive than Spring.

One of the real strengths of Rails is its gem library. Play! suffers from a lack of plugins. However, Scala is a faster language than Ruby, and that means that Play! can be a faster framework than Rails and therefore more scaleable than Rails.

### ASP.NET MVC(.NET)

ASP.NET is developed by Microsoft and meant to be an MVC framework for .NET languages. Many .NET languages, such as C#, are supported. As a Microsoft product, it's particularly suited for development on Windows machines, unlike Rails, whose gems expect Unix-like behavior. A lot of enterprise projects are already built with .NET code, and it's easy to build an ASP.NET framework over them.

Rails and ASP.NET are fairly similar, and a lot comes down to language preference between Ruby and C# or other .NET languages.

### Laravel (PHP)

PHP is the most popular server-side language in use, and Laravel, although fairly young, is its most popular framework. Its age does mean that it was developed with modern architecture in mind. PHP is an easier language to learn than Ruby, but is more verbose and was designed to be a scripting language. Laravel lacks the power of Rails's implicit conventions -- code needs to be more explicit. However, for this reason, it is more flexible because Rails is such a structured framework.