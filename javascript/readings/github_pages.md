## Github Pages

So far, we have used Github to back up and share our Git repos. However, you can
also use it to deploy websites through Github Pages. You are limited to static
content (most importantly for our purposes, HTML, CSS, and Javascript), which
means you won't be using Github Pages for your Rails apps, but they are a great
option for quickly deploying projects like Javascript games or a static
portfolio site.

## Personal Pages

Every Github account can host a site on Github Pages. To create a new site, all
you need is a repo named `[your_username].github.io`. Once you push to Github,
the site should go live within an hour. Make sure to name that file you want to see
`index.html`. This will get loaded when you visit `[your_username].github.io`. If you
name HTML files something else, you can access them at
`[your_username].github.io/[your_filename].html`. For more explicit instructions,
follow the step-by-step directions from [Github Pages][github-pages] for creating a
"User or organization site".

## Making a Project Repo Page

There is also a way to deploy directly from a project repo, if you'd like for a repo to
have its own page. Create a branch named `gh-pages` in your repo, and the contents of
that branch will be available as a directory of your main site (for example, at
`[your_username].github.io/[your_repo_name]`). As with your main site, the `index.html`
file inside the `gh-pages` branch will be served when someone visits the directory. Note
that this `index.html` file does not need to exist on your `master` branch! This
lets you deploy without degrading your repo structure, keeping your code contained and
maintainable. Step-by-step instructions can be found [here][configuring-github-pages].

[github-pages]: https://pages.github.com/
[configuring-github-pages]: https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages
