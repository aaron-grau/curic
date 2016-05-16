## Github Pages

So far, we have used Github to back up and share our Git repos. However, you can
also use it to deploy websites through Github Pages. You are limited to static
content (most importantly for our purposes, HTML, CSS, and Javascript), which
means you won't be using Github Pages for your Rails apps, but they are a great
option for quickly deploying projects like Javascript games or a static
portfolio site.

## Personal Pages

Every Github account can host a site on Github Pages. To create a new site, all
you need is a repo named "username.github.io". Once you push to Github, the site
should go live within an hour. You probably want a file called index.html, which
will be served when someone visits the root; otherwise, content is up to you.

## Adding Projects

You could add projects directly to the main repo, but you probably don't want
to: mashing everything together in one place would make for an unwieldy
filestructure and make maintaining your site unnecessarily complex. It would
also force you either to give up on having self-contained repos for each project
or to make any changes in two places.

Fortunately, there is a way to deploy directly from a project repo. Create a
branch named gh-pages, push to Github, and the contents of that branch will be
available as a directory of your main site (for example, at
username.github.io/asteroids). This lets you deploy without degrading your repo
structure, keeping your code contained and maintainable. As with your main site,
index.html will be served when someone visits the directory, while other
documents can be requested by name.

## Reference

* [Github's guide](https://pages.github.com/)
