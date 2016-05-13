## Simple Git Workflow

Git is a powerful tool, and it will take time to take full advantage of its
features. When starting out, however, you only need a few commands to protect
your work.

## Setup

You should use Git's command line interface. When starting your project, there
are two essential commands.

`git init`

`git remote add your_alias https://github.com/your_username/your_repo_name`

Line by line:

* `git init`

This creates an empty repo in the current directory. Git looks at the current
directory and its children: this means that you should create the repo at the
root level of your project. In particular, in a Rails project, you want to run
`rails new`, `cd` into the directory you just created, then run `git init`.

* `git remote add your_alias https://github.com/your_username/your_repo_name`

This command breaks down into the following components:

* `git remote` accesses the git commands that interact with remote repos
* `add` (not to be confused with `git add`) is a `git remote` command that adds
a remote repo to the current repo
* `your_alias` sets a name you can use locally to refer to the remote repo; use
`origin` unless you have a reason not to
* `https://github.com/your_username/your_repo_name` sets the location of the
repo (this example is for HTTPS; for SSH, it will look different). You will have
to create this separately, either in the browser or through the command line

At this point, you have a local repo (stored in the .git directory) and a remote
repo, which you can reference with `your_alias`; time to start working.

## Working

Now you've written some code and are ready to commit. You need three commands:

`git add -A`

`git commit -m "some comment"`

`git push`

Line by line:

* `git add -A`: `git add` will stage file changes for commitment; `-A` is an
option that [tells git what files to choose](git-add.md).

So far, all we've done is told git to prepare to commit; nothing is persisted to
the repository.

* `git commit -m 'your commit message here'`: `git commit` takes currently staged
files and stores them in the repository. `-m` is a flag indicating that we want
to write our commit message on the command line. A commit message is a brief
summary of the changes that we're committing. If we don't use the `-m` flag,
then git will open our default editor so that we can compose our commit. Make
your commit message descriptive, so that someone reading your commit history
(maybe you!) can understand what you changed.

At this point, our local repository has a record of the commit, but we haven't
touched the remote repo.

* `git push`: this command pushes our local commits to the remote repository.
The first time you run this, you need to run the command as
`git push -u your_alias master`, which will set the master branch in the remote
repo `your_alias` as the upstream tracking branch for your local branch; once you
have set this up, you will be able to run `git push` and git will direct the push
to the upstream repo. To push to a particular remote, use
`git push remote_name branch_name` (for example, `git push origin master`).

If you are using HTTPS, you will need to authenticate with GitHub when you push;
when using SSH, your computer and the server will use your SSH key to handle
this for you. For this reason, it is worth setting up SSH on your dev machine.
On App Academy machines, use HTTPS.

## How Often to Commit and Push

Frequently.

Pushing to GitHub is one of the most useful features we have in Git. This is
because, ultimately, code problems are always fixable: if you can create a bug,
you can eliminate it through debugging alone (not that you shouldn't revert to
a previous commit if that is the best solution). Pushing to a remote does a few
additional things:

* Backs up your work
* Makes your code portable
* Gets you green squares

A good rule of thumb is to commit whenever you make something and confirm that
it works (the second part is important; you don't want non-functional commits
cluttering your repos). Most commits will be small; this is good, as it reduces
the cost of reverting to a previous stage. You don't have to push every time you
commit, but there is usually no reason not to.

## Reference

When you create a new GitHub repository in the browser, GitHub will provide a
summary of the commands needed to connect it to a local repository.

For common git commands, check out the
[git summary](../w1d2/git-summary.md).

## Exercises

### My first git

Test if you've installed git by running `which git`.  If you've installed git, something like `/usr/local/bin/git` will print out.  If nothing prints out, you probably haven't installed git.

If you haven't installed git, install it [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

Make a new folder on your computer.  `cd` into it and save a sample file (you can put whatever you want in the file).

Run `git status` in terminal.  You should get an error.  Read the error and see if it makes sense.

Now initialize git with `git init`.

Run `git status` again and compare.

Git add the sample file you just made.

Run `git status` again.  What changed?

Save a new sample file (don't add it yet).

Run `git status` and compare.

Play around with saving and adding new sample files to get a feel for it.

Create three new files (don't add them individually), then run `git add -A`.  Run `git status` and compare.

Run `git reset #{one_of_your_files.rb}`.  Run `git status` and compare.

Once you have a sense of what it means to be "staged" and "unstaged", commit your change.

Run `git status` again (surprise!).  What changed?

Run `git log` and notice what shows up.

Run `git log -p` and notice what shows up.

Delete one of the sample files you made.

Run `git status`.  Run `git status` whenever you want feedback on what you did.

Create two new files.  Run `git status`.

Run `ls`

Run `git reset --hard`

Run `ls`

Run `git status`.  What did `reset --hard` do?  It's dangerous, so use it sparingly.

Play with `reset --hard` a couple more times, try to figure out what it does.

Make a new file, add it, and commit.

Run `git log` to see both your commits.

### Branching out

Make a new branch called `magic`: `git checkout -b magic`.

Run `git branch` and see what shows up.  How can you tell which branch you're on?

Make a new file called `rabbit.txt`.  Add and commit it.

Check out your master branch again with `git checkout master`.

Run `git branch`.

Run `ls`.  Where did the rabbit go?

Checkout your `magic` branch again.

Run `ls`.  It's like pulling a rabbit out of a...never mind.

Play around with checking out some new branches.  Make a branch off of magic, as well as a new branch off of master.

See how each branch is independent?

Now checkout `master` and run `git merge magic` (you might have to run :wq if a message pops up).

Now run `ls`.  Your rabbit should appeacr.


### Push it - Push it good

Make a new repo on [github](https://github.com/new).  Follow the instructions there and push your code up.

I should be able to go to https://github.com/yourusername/yourproject and see your files there.

### Do it visually

Draw out on paper how you would represent unstaged, staged, and committed changes.  Use boxes, circles, and arrows to represent what's going on.  It's OK if you don't have a perfect mental model.  You'll be comparing with partners tomorrow.

### Bonus

`cd` into the `.git` folder and poke around.  Does anything look familiar?
