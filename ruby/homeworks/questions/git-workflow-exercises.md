# Git Workflow Homework

This homework will apply the tools you learned in the [git workflow reading][git-workflow].

[git-workflow]: ../../readings/git-workflow.md

## My first git

### Getting git installed

Test if you've installed git by running `which git`.  If you've installed git, something like `/usr/local/bin/git` will print out.  If nothing prints out, you probably haven't installed git.

If you haven't installed git, install it [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

### Initialize git

Make a new folder on your computer.  `cd` into it and save a sample file (you can put whatever you want in the file).  

Run `git status` in terminal.  You should get an error.  Read the error and see if it makes sense.  

Now initialize git with `git init`.  Run `git status` again and compare.

### Adding a single file to git

Git add the sample file you just made.  Run `git status` again.  What changed?

Save a new sample file (don't add it yet).  Run `git status` and compare. Play around with saving and adding new sample files to get a feel for it.

### Adding multiple files to git

Create three new files (don't add them individually), then run `git add -A`.  Run `git status` and compare.

### Resetting a file

Run `git reset #{one_of_your_files.rb}`.  Run `git status` and compare.

Once you have a sense of what it means to be "staged" and "unstaged", commit your change.

Run `git status` again (surprise!).  What changed?

Run `git log` and notice what shows up.

Run `git log -p` and notice what shows up.

Delete one of the sample files you made.

Run `git status`.  Run `git status` whenever you want feedback on what you did.

### Resetting git

Create two new files.  Run `git status`.

Run the following sequence of commands: `ls`, `git reset --hard`, `ls`, `git status`.  What did `reset --hard` do?  It's dangerous, so use it sparingly.  Play with `reset --hard` a couple more times, try to figure out what it does.

Make a new file, add it, and commit.  Run `git log` to see both your commits.

## Branching out

Make and check out a new branch called `magic` by typing `git checkout -b magic`.  Run `git branch` and see what shows up.  How can you tell which branch you're on?

Make a new file called `rabbit.txt`.  Add and commit it.  Check out your master branch again with `git checkout master`.  Run `git branch`, then `ls`.  Where did the rabbit go?

Checkout your `magic` branch again and run `ls`.  It's like pulling a rabbit out of a...never mind.  Play around with checking out some new branches.  Make a branch off of magic, as well as a new branch off of master.  See how each branch is independent?

Now checkout `master` and run `git merge magic` (you might have to run `:q` then hit enter if a message pops up).  Now run `ls`.  Your rabbit should appear.


## Pushing to GitHub

Make a new repo on [github](https://github.com/new).  Follow the instructions provided by github and push your code up.  You should be able to go to `https://github.com/yourusername/yourproject` and see your files there.

## Do it visually

Draw out on paper how you would represent unstaged, staged, and committed changes.  Use boxes, circles, and arrows to represent what's going on.  It's OK if you don't have a perfect mental model.

## Bonus

`cd` into the `.git` folder and poke around.  Does anything look familiar?
